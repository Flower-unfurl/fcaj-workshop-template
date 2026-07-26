---
title : "Project Overview & Architecture"
date : 2024-01-01
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

## Introduction to AWS Serverless Architecture
Serverless (Serverless Architecture) is a cloud computing execution model that allows you to build and run applications without needing to manage, operate, or maintain physical or virtual server infrastructure.

+ **Faster time-to-market:** Development teams can quickly bring ideas to life and ship new features without being blocked by infrastructure concerns.

+ **Cost optimization:** Maximize budget efficiency by completely eliminating the cost of maintaining idle resources.

+ **High reliability and security:** Easily apply AWS's strict security standards along with fine-grained IAM policies for precise access control.

## Workshop Overview

Below is a list of AWS services used to build the game's architecture and their specific roles:

| AWS Service | In-game Component | Primary Function |
| :--- | :--- | :--- |
| **AWS Amplify** | Frontend Distribution | Hosts and distributes the web game interface (Frontend). |
| **Amazon Route 53** | DNS & Routing | DNS service that manages the domain name and routes player traffic to the application. |
| **Amazon Cognito** | Player Auth | Manages identity, authenticates players, issues, and verifies JWT Tokens (JWT Verification). |
| **Amazon API Gateway** | HTTP & WebSocket API | **HTTP API:** Receives and processes RESTful requests from the client.<br><br>**WebSocket API:** Manages continuous two-way real-time connections between players and the game server. |
| **AWS Lambda** | Game Logic Engine | **HTTP Backend:** Handles the management of Decks, Leaderboards, Ranks, and Matches.<br><br>**WebSocket Handlers:** Processes connection lifecycles and match logic (Connect/Disconnect, Start/Process/Cancel/End Match).<br><br>**Workers & Tasks:** Handles Timeouts, Post Match operations, and recalculates the leaderboard. |
| **Amazon EventBridge** | Scheduled Task | A scheduler that automatically triggers the Rebuild Leaderboard-Rank Lambda function periodically every 10 minutes. |
| **Amazon SQS** | Message Queue | **Delayed SQS:** Sits between the Process Game Engine and Handle Timeout to manage delayed/countdown events.<br><br>**Standard SQS:** Receives data from End Match and pushes it to the Post Match Worker for processing, helping to reduce the load. |
| **Amazon DynamoDB** | NoSQL Database | A high-speed NoSQL database that stores all system data: UserProfile, MatchHistory, GameState, GameLogs, and Connections. |