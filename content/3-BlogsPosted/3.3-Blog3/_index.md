---
title: "Blog 3"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.3. </b> "
---

# BUILDING A MULTIPLAYER GAME WITH AWS SERVERLESS ARCHITECTURE

## INTRODUCTION
Game development is a highly iterative process with rapidly changing requirements. Many game developers want to maximize the time spent building features while reducing time spent on server configuration, infrastructure management, and scaling. Adopting AWS Serverless architecture provides 4 core benefits: shorter time-to-market, cost savings, automatic scaling based on player load, and built-in integrated services.
To demonstrate, the following is a web-based game project built on a serverless-first architecture, with fully featured real-world functionality including single/multiplayer modes, registration, messaging, leaderboards, and content creation.

## OVERVIEW OF SIMPLE TRIVIA SERVICE – A SIMPLE TRIVIA GAME
### User Interface (Front-end)
The game interface is built as a Single Page Application (SPA) using Vue.js, enabling connection to backend services via HTTPS and WebSockets. This Frontend is built, deployed, and hosted using AWS Amplify without any server management.
### Backend Architecture and Services Used
The backend is defined through AWS Serverless Application Model (AWS SAM) templates. The architecture uses a combination of diverse services:
- Core Serverless services: AWS Lambda (runs microservice code), Amazon API Gateway and AWS IoT (provide HTTP and WebSocket endpoints), Amazon DynamoDB (data storage), and Amazon SNS (pub/sub messaging).
- Other supporting services: Amazon Cognito for login management, Athena/Kinesis/S3 for data analytics, and Amazon ElastiCache for Redis (not serverless) placed within a VPC to meet ultra-low latency requirements.
### Security and Communication
Players need to register and log in via Amazon Cognito; upon authentication, the system returns a JWT token for API Gateway to validate requests sent to Lambda. For IoT connections, security is further enhanced through AWS IAM policies.
### Game Mode Architecture Models for Simple Trivia Service
Depending on the game mode, the game applies different backend architectures:
- Single-player mode: Uses API Gateway (HTTP API) for one-way communication from the player to the system. Lambda functions handle game logic and scoring. Notably, the player's score and progress are updated asynchronously via Amazon SNS, allowing players to receive results instantly without waiting for the system to write to the database.
- Multiplayer mode - Standard and Competitive: This mode requires continuous two-way communication, so it uses API Gateway WebSockets. The game state is managed directly by the room host's client. The system uses DynamoDB to track which players are connected and in which room.
- Multiplayer mode - Live Leaderboard: This structure is more complex, using AWS IoT (WebSockets over MQTT) as the primary transport method. The key difference is that the game state is moved from the client to backend storage using ElastiCache for Redis to ensure millisecond response times, allowing the entire player leaderboard to be updated in real time.
## CONCLUSION
Through the real-world Simple Trivia Service project, it has been demonstrated that an AWS ecosystem can fully and seamlessly handle even the most demanding requirements of the gaming industry. Serverless architecture is not merely a cost-optimization solution; it is actively reshaping the design and operational thinking of game developers. By completely eliminating the burden of server configuration and infrastructure management, the "serverless-first" approach empowers development teams to dedicate their entire focus to what matters most: creating content, enhancing the player experience, and minimizing time-to-market.

![Blog3](/images/3-BlogsPosted/Blog3.png)

[Link to published blog post](https://www.facebook.com/groups/awsstudygroupfcj/posts/2209312269833733?locale=vi_VN)

[Link to reference documentation](https://aws.amazon.com/blogs/compute/building-a-serverless-multiplayer-game-that-scales/)