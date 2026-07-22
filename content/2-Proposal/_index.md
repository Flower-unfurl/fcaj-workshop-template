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

_Current Problems_

- Traditional real-time game systems require continuous server maintenance costs even when there are no players.

- Network latency negatively impacts the experience of games that require constant tactical calculation.

_Solution_  
Deploy a Serverless Real-time Architecture via Amazon API Gateway (WebSocket API) and AWS Lambda functions to create independent processing flows. Converge to a single Game Engine flow that interacts directly with Amazon DynamoDB to update state, ensuring low latency and cost savings.

### 3. Solution Architecture

The platform applies AWS Serverless architecture to operate a real-time turn-based trading card web game, capable of automatically scaling to support thousands of simultaneous players. The user interface is distributed via AWS Amplify and Route 53, secured and authenticated by Amazon Cognito.

Real-time bidirectional connections (WebSocket) are routed through Amazon API Gateway to interact directly with a set of AWS Lambda functions (Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match) to handle all centralized game logic.

Game data and connection information are stored in Amazon DynamoDB. Additionally, after a match ends, events are pushed to Amazon SQS for a Lambda function (Post Match Worker) to asynchronously process tasks such as updating Rank, EXP, and saving match history, ensuring high performance and ultra-low latency.

![IoT Weather Station Architecture](/images/2-Proposal/ar2.png)

_AWS Services Used_

- _AWS Amplify_: Hosts and distributes the web game interface (React/TypeScript), automates CI/CD.

- _AWS Lambda_: Processes data and triggers Glue jobs (2 functions).

- _Amazon Route 53_: Communicates with the web application.

- _Amazon S3_: Manages domain names and routes player traffic to the application.

- _Amazon Cognito_: Authenticates player identities, manages login sessions, and issues JWT Tokens.

- _Amazon API Gateway (WebSocket API)_: Manages real-time bidirectional connections between the Client and Server.

- _AWS Lambda_: Handles centralized game logic and computation tasks.

- _Amazon SQS_: An asynchronous queue that receives data from the Lambda Engine and processes it.

- _Amazon DynamoDB_: A NoSQL database storing match state, connection information, and user data.

- _Security & Monitoring (IAM, KMS, Secrets Manager, CloudWatch, X-Ray)_: Authorization security, key management, log tracking, and system performance monitoring.

_Component Design_

- _Real-time routing_: Amazon API Gateway combined with Route 53 manages bidirectional WebSocket connections between players and the system.

- _Game logic processing_: A set of AWS Lambda functions acting as a centralized Game Engine.

- _Asynchronous processing_: Amazon SQS receives match-end events for a Lambda worker to automatically calculate Rank, EXP, and save history.

- _Data processing_: Amazon DynamoDB stores board state, connection information, and player profiles.

- _Web interface_: Built with React / TypeScript, packaged and distributed via AWS Amplify's CDN network.

- _User management_: Uses Amazon Cognito User Pool to manage the full account lifecycle (registration, authentication, password change, and session revocation).

### 4. Technical Implementation

_Deployment Phases_

1. Infrastructure initialization: Deploy the environment, domain, and set up CI/CD via AWS Amplify.

2. Connection & Authentication: Configure Amazon Cognito for users and establish the WebSocket connection flow via API Gateway.

3. Game Engine Development: Program core Lambda functions (Start Match, Process Action, End Match) to handle card game logic.

4. Post-match processing: Configure the SQS queue and Lambda Worker to handle Rank scores and history without causing system bottlenecks.

5. Testing & Optimization: Monitor with X-Ray, CloudWatch, optimize security with WAF/IAM, and perform load testing (Stress Test).

_Technical Requirements_

- _System Infrastructure_: AWS Amplify (Hosting & CI/CD), GitHub, Route 53 (domain), IAM and VPC for system deployment, management, and security.

- _Game Platform_: Amazon Cognito (JWT authentication), API Gateway (WebSocket), AWS Lambda (game logic processing), DynamoDB (storing player data, matches, and decks), Amazon SQS (post-match task processing), CloudWatch and X-Ray (monitoring), AWS WAF (security). Frontend uses React connected via WebSocket to synchronize match state in real time.

### 5. Roadmap & Milestones

- _Pre-internship (Month 0)_: 1 month of planning.
  - Month 1: Study and learn AWS services, practice Labs to consolidate knowledge.
  - Month 2: Design and adjust the architecture.
  - Month 3: Deploy, test, and go live.
- _Post-deployment_: Research and develop additional new features.

### 6. Budget Estimate

_Infrastructure Costs_

- AWS Amplify: $0.00 – $0.02/month (Hosting ~500 MB, CI/CD a few deployments, within 12-month Free Tier).

- Amazon Route 53: $0.50/month (01 Hosted Zone, excluding domain registration fee).

- Amazon Cognito: $0.00/month (≤ 10 users, within Free Tier MAU).

- Amazon API Gateway (WebSocket): $0.00 – $0.02/month (~20,000 WebSocket messages and low connection time, within Free Tier).

- AWS Lambda: $0.00/month (~50,000 requests, 512 MB, below Free Tier of 1 million requests and 400,000 GB-s).

- Amazon DynamoDB: $0.00/month (≈1 GB data, Provisioned 25 WCU/RCU mode for $0 within Free Tier).

- Amazon SQS: $0.00/month (~10,000 messages, below Free Tier).

- Amazon CloudWatch: $0.00/month (≈1 GB log storage, below 5 GB free/month threshold).

- AWS X-Ray: $0.00/month (low trace volume, within Free Tier).

- AWS KMS: $0.00/month (using AWS-managed keys).

- AWS Systems Manager Parameter Store: $0.00/month (Replaces Secrets Manager to store 01 Secret completely free).

- Internet Data Transfer: $0.00/month (~1 GB Data Transfer Out, below 100 GB free/month threshold).

- AWS WAF: $0.00/month (if disabled) / ≥ $5.00/month (if 01 Web ACL is enabled to filter malicious requests).

_Total Cost_:

- MVP infrastructure cost (without WAF): approximately $0.54/month (~$6.50/year).

- MVP infrastructure cost (with WAF): approximately $5.54/month (~$66.50/year).

### 7. Risk Assessment

_Risk Matrix_

- Lambda Cold Start causing lag on the first turn: Medium likelihood, medium impact.

- Player-side WebSocket connection drops: High likelihood, high impact.

- Hitting AWS Quota limits: Low likelihood, very high impact.

_Mitigation Strategies_

- Mitigating Lambda Cold Start: Optimize startup time by reducing package size, reusing connections, and only configuring Provisioned Concurrency for real-time processing Lambdas (Process Game Engine) when the system has high traffic. This significantly reduces first-turn latency while still optimizing operational costs.

- Mitigating WebSocket disconnections: Build an Auto-Reconnect mechanism on the Frontend combined with periodic heartbeat signals to detect connection loss. When a player reconnects, API Gateway and Lambda update the new Connection ID in DynamoDB, then re-synchronize the current Game State so the player can continue the match without creating a new session.

- Mitigating AWS Quota limits: Set up CloudWatch Metrics and CloudWatch Alarms to monitor the number of WebSocket connections, Lambda Invocations, and critical resources. When resources reach approximately 70–80% of their limits, the system sends an email alert for administrators to proactively request limit increases before users are affected.

_Contingency Plan_

- Resource scaling: When AWS resources approach Service Quota limits, administrators request limit increases and temporarily restrict the creation of new matches, prioritizing resources for ongoing matches to ensure system stability.

### 8. Expected Outcomes

- _Technical improvement_: Successfully build a fully Serverless Game Engine flow, replacing continuously maintained servers to reduce costs.

- _Long-term value_: A data platform for game development that can be reused for future projects.
