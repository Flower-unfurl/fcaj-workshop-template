---
title: "Proposal"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Chrono Genesis Game

## A Turn-Based Trading Card Web Game Built on a Serverless Architecture on AWS

### 1. Executive Summary

The project is Chrono Genesis Game, a turn-based trading card web game built on a Serverless Real-time Architecture on AWS.

The entire game uses WebSocket to synchronize data in real time. Match business logic is handled by multiple specialized AWS Lambda functions. The system uses Amazon DynamoDB exclusively as a comprehensive data center, serving two roles: storing match state (Game State) with millisecond-level latency in real time, while also securely and cost-efficiently storing persistent data (User, Deck, Match History, Logs).

### 2. Problem Statement

**_Current Problems_**

- Traditional real-time game systems require continuous server maintenance costs even when there are no players.

- Network latency negatively impacts the experience of games that require constant tactical calculation.

**_Solution_**  
Deploy a Serverless Real-time Architecture via Amazon API Gateway (WebSocket API) and AWS Lambda functions to create independent processing flows. Converge to a single Game Engine flow that interacts directly with Amazon DynamoDB to update state, ensuring low latency and cost savings.

### 3. Solution Architecture

The platform applies AWS Serverless architecture to operate a real-time turn-based trading card web game, capable of automatically scaling to support thousands of simultaneous players. The user interface is distributed via AWS Amplify and Route 53, secured and authenticated by Amazon Cognito.

Real-time bidirectional connections (WebSocket) are routed through Amazon API Gateway to interact directly with a set of AWS Lambda functions (Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match) to handle all centralized game logic.

Game data and connection information are stored in Amazon DynamoDB. Additionally, after a match ends, events are pushed to Amazon SQS for a Lambda function (Post Match Worker) to asynchronously process tasks such as updating Rank, EXP, and saving match history, ensuring high performance and ultra-low latency.

![Architecture](/images/2-Proposal/arch.png)

**_AWS Services Used_**

- _AWS Amplify_: Hosts and distributes the web game's frontend interface.

- _Amazon Route 53_: A DNS service that manages the domain name and routes player traffic to the application.

- _Amazon Cognito_: Manages player identity, handles authentication, and issues and verifies JWT Tokens (JWT Verification).

- _Amazon API Gateway (HTTP & WebSocket)_:

  - _HTTP API_: Receives and processes RESTful requests from the client; after passing through JWT verification, it invokes the Lambda HTTP backend functions.

  - _WebSocket API_: Manages persistent, real-time bidirectional connections between players and the game server.

- _AWS Lambda_: Serves as the core logic processor, divided into multiple independent functional groups:

  - _HTTP Backend (chrono-http-backend)_: Handles management tasks such as Deck, Leaderboard, Rank, and Match operations.

  - _WebSocket Handlers_: Manages the connection lifecycle and match logic, including: ConnectHandler, DisconnectHandler, Start Match, Process Game Engine, Cancel Match, and End Match.

  - _Background Workers_: Handle Timeout (processes logic when time expires) and Post Match Worker (updates match results after a match concludes).

  - _Scheduled Task_: The Rebuild Leaderboard-Rank function, used to recalculate and update the leaderboard rankings.

- _Amazon EventBridge (Schedule)_: A scheduler (Cronjob) that automatically triggers the Rebuild Leaderboard-Rank Lambda function every 10 minutes.

- _Amazon SQS (Simple Queue Service)_: An asynchronous message queue, comprising:

  - _Delayed SQS_: Sits between Process Game Engine and Handle Timeout to manage timed or countdown events within the game.

  - _Standard SQS_: Receives data from the End Match function and forwards it to the Post Match Worker for processing, reducing load on the main execution flow.

- _Amazon DynamoDB_: A high-performance NoSQL database containing dedicated tables for storing all system data: UserProfile, MatchHistory, GameState, GameLogs, and Connections.

- _Security & Monitoring_:

  - _IAM_: Controls access and manages resource permissions.

  - _KMS & Secrets Manager_: Manages encryption keys and securely stores sensitive credentials.

  - _CloudWatch & X-Ray_: Stores logs, monitors system performance, and traces request flows for optimization and debugging.

**_Component Design_**

- _Real-time routing_: Amazon API Gateway combined with Route 53 manages bidirectional WebSocket connections between players and the system.

- _Game logic processing_: A set of AWS Lambda functions acting as a centralized Game Engine.

- _Asynchronous processing_: Amazon SQS receives match-end events for a Lambda worker to automatically calculate Rank, EXP, and save history.

- _Data processing_: Amazon DynamoDB stores board state, connection information, and player profiles.

- _Web interface_: Built with React / TypeScript, packaged and distributed via AWS Amplify's CDN network.

- _User management_: Uses Amazon Cognito User Pool to manage the full account lifecycle (registration, authentication, password change, and session revocation).

### 4. Technical Implementation

**_Deployment Phases_**

1. Infrastructure initialization: Deploy the environment, domain, and set up CI/CD via AWS Amplify.

2. Connection & Authentication: Configure Amazon Cognito for users and establish the WebSocket connection flow via API Gateway.

3. Game Engine Development: Program core Lambda functions (Start Match, Process Action, End Match) to handle card game logic.

4. Post-match processing: Configure the SQS queue and Lambda Worker to handle Rank scores and history without causing system bottlenecks.

5. Testing & Optimization: Monitor with X-Ray, CloudWatch, optimize security with WAF/IAM, and perform load testing (Stress Test).

**_Technical Requirements_**

- _System Infrastructure_: AWS Amplify (Hosting & CI/CD), GitHub, Route 53 (domain), IAM and VPC for system deployment, management, and security.

- _Game Platform_: Amazon Cognito (JWT authentication), API Gateway (WebSocket), AWS Lambda (game logic processing), DynamoDB (storing player data, matches, and decks), Amazon SQS (post-match task processing), CloudWatch and X-Ray (monitoring), AWS WAF (security). Frontend uses React connected via WebSocket to synchronize match state in real time.

### 5. Roadmap & Milestones

- _Pre-internship (Month 0)_: 1 month of planning.
  - Month 1: Study and learn AWS services, practice Labs to consolidate knowledge.
  - Month 2: Design and adjust the architecture.
  - Month 3: Deploy, test, and go live.
- _Post-deployment_: Research and develop additional new features.

### 6. Budget Estimate

**_Infrastructure Costs_**

- AWS Amplify: $0.00 – $0.02/month (Hosting the web game frontend interface with automated CI/CD, within the 12-month Free Tier).

- Amazon Route 53: $0.50/month (Maintaining 01 Hosted Zone for routing; excludes the initial domain registration fee).

- Amazon Cognito: $0.00/month (User management and authentication, JWT issuance; below the 50,000 MAU Free Tier limit).

- Amazon API Gateway (HTTP & WebSocket): $0.00 – $0.02/month (Covers both the HTTP API for RESTful requests and the WebSocket API for maintaining real-time connections. MVP-level traffic is well within the 1 million free requests/messages threshold).

- AWS Lambda: $0.00/month (Powers the entire compute layer: HTTP backend, Game Engine, WebSocket Handlers, and asynchronous Worker functions. Stays below 1 million requests and 400,000 GB-s of the Free Tier).

- Amazon EventBridge (Schedule): $0.00/month (Schedules the Rebuild Leaderboard-Rank Lambda function to trigger every 10 minutes, generating approximately 4,320 events/month. Well within the 1 million free events allowance).

- Amazon SQS: $0.00/month (Uses 02 queues: a Delayed SQS for countdown game events and a Standard SQS for the Post Match Worker. Message volume is low and completely free below the 1 million requests threshold).

- Amazon DynamoDB: $0.00/month (Supports 5 data tables: UserProfile, MatchHistory, GameState, GameLogs, and Connections. Must be configured in Provisioned mode with a combined capacity of under 25 WCU and 25 RCU across all tables to remain within the Free Tier).

- _Security & Monitoring_:

  - AWS IAM: $0.00/month (Permission management is always free).

  - AWS KMS: $0.00/month (When using AWS-managed encryption keys).

  - AWS Secrets Manager: ~$0.40/month.

  - Amazon CloudWatch & AWS X-Ray: $0.00/month (System monitoring, log storage, and request flow tracing; below the 5 GB free log threshold per month).

- Internet Data Transfer Out: $0.00/month (Below the 100 GB free threshold per month).

- AWS WAF (Optional): $0.00/month (if not enabled) / ≥ $5.00/month (if 01 Web ACL is enabled to protect API Gateway from malicious requests).

**_Estimated Total Cost_**:

- MVP infrastructure cost (without WAF): Approximately $0.92 – $0.94/month (~$11/year). 

- MVP infrastructure cost (with WAF): Approximately $5.94/month (~$71/year).

### 7. Risk Assessment

**_Risk Matrix_**

- Lambda Cold Start causing lag on the first turn: Medium likelihood, medium impact.

- Player-side WebSocket connection drops: High likelihood, high impact.

- Hitting AWS Quota limits: Low likelihood, very high impact.

**_Mitigation Strategies_**

- Mitigating Lambda Cold Start: Optimize startup time by reducing package size, reusing connections, and only configuring Provisioned Concurrency for real-time processing Lambdas (Process Game Engine) when the system has high traffic. This significantly reduces first-turn latency while still optimizing operational costs.

- Mitigating WebSocket disconnections: Build an Auto-Reconnect mechanism on the Frontend combined with periodic heartbeat signals to detect connection loss. When a player reconnects, API Gateway and Lambda update the new Connection ID in DynamoDB, then re-synchronize the current Game State so the player can continue the match without creating a new session.

- Mitigating AWS Quota limits: Set up CloudWatch Metrics and CloudWatch Alarms to monitor the number of WebSocket connections, Lambda Invocations, and critical resources. When resources reach approximately 70–80% of their limits, the system sends an email alert for administrators to proactively request limit increases before users are affected.

**_Contingency Plan_**  

- Resource scaling: When AWS resources approach Service Quota limits, administrators request limit increases and temporarily restrict the creation of new matches, prioritizing resources for ongoing matches to ensure system stability.

### 8. Expected Outcomes

- _Technical improvement_: Successfully build a fully Serverless Game Engine flow, replacing continuously maintained servers to reduce costs.

- _Long-term value_: A data platform for game development that can be reused for future projects.
