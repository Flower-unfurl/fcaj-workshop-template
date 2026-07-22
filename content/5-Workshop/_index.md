---
title: "Workshop"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---


# BUILDING A WEB GAME ON AWS WITH SERVERLESS ARCHITECTURE

#### Overview

**AWS Serverless Architecture** provides flexible auto-scaling and cost optimization for applications with continuously fluctuating traffic — especially real-time online games.

In this lab, you will learn how to design, configure, and deploy the **Chrono Genesis Game** project — built entirely on a Serverless Real-time Architecture on the AWS platform.

We will leverage and combine the following core AWS services to build a complete two-way synchronized game system:

+ **API Gateway (WebSocket API) & Amazon Cognito:** Maintains real-time connections between players and the system after successful user authentication using JWT Tokens.

+ **AWS Lambda & Amazon SQS:** Lambda handles all game logic, while SQS asynchronously processes tasks such as updating Rank, EXP, and match history.

+ **Amazon DynamoDB:** A comprehensive data hub that stores real-time match states and long-term player information.

+ **AWS Amplify Hosting:** Globally distributes the Web frontend (React/TypeScript) and automates the CI/CD pipeline.

#### Contents

1. [Workshop Overview](5.1-Workshop-overview/)
2. [Prerequisites](5.2-Prerequiste/)
3. [Create Amazon DynamoDB Database](5.3-S3-vpc/)
4. [Set Up Authentication & API Gateway WebSocket](5.4-S3-onprem/)
5. [Configure Business Logic Compute (AWS Lambda Functions & SQS)](5.5-Policy/)
6. [Deploy Frontend Web Game with AWS Amplify Hosting](5.6-Deploy/)
7. [Clean Up Resources](5.7-Cleanup/)