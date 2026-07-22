---
title : "Project Overview & Architecture"
date : 2024-01-01
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

#### Introduction to AWS Serverless Architecture
Serverless (Serverless Architecture) is a cloud computing execution model that allows you to build and run applications without needing to manage, operate, or maintain physical or virtual server infrastructure.

+ **Faster time-to-market:** Development teams can quickly bring ideas to life and ship new features without being blocked by infrastructure concerns.

+ **Cost optimization:** Maximize budget efficiency by completely eliminating the cost of maintaining idle resources.

+ **High reliability and security:** Easily apply AWS's strict security standards along with fine-grained IAM policies for precise access control.

#### Workshop Overview

Below is a list of AWS services used to build the game's architecture and their specific roles:

| AWS Service | In-game Component | Primary Function |
| :--- | :--- | :--- |
| **AWS Amplify Hosting** | Frontend Distribution | Hosting & distributing React/TypeScript Web App, automated CI/CD. |
| **Amazon Cognito** | Player Auth | Account management, Registration/Login, issuing JWT Tokens. |
| **API Gateway WebSocket** | Real-time Gateway | Maintaining real-time two-way connection between Web and Server. |
| **AWS Lambda** | Game Logic Engine | Processing match logic, checking Mana, drawing cards, calculating damage. |
| **Amazon DynamoDB** | NoSQL Database | Storing GameState (TTL), User Profile, Match History, Connections. |
| **Amazon SQS** | Message Queue | Buffering match results for asynchronous Rank/EXP updates. |