---
title: "Setup API Gateway and WebSocket"
date: 2024-01-01
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

In this section, you will configure **Amazon API Gateway** to expose the application's backend services. API Gateway acts as the entry point for requests from the frontend and forwards them to AWS Lambda functions, allowing the system to operate on a secure and scalable serverless model.

You will also configure the API to communicate with the frontend application deployed on AWS Amplify. Setting up Routes, integrating Lambda, creating Stages, and configuring CORS will ensure user requests are processed accurately.

After completing this section, the system will have a fully functional **HTTP API**, ready to connect the frontend and backend.

## Objectives

- Understand the role of Amazon API Gateway in the system architecture.
- Grasp the basic concepts of HTTP APIs.
- Configure Routes and integrate with AWS Lambda.
- Configure CORS so the frontend can access the API.
- Deploy the API and verify the results.

## Contents

1. **Introduction** – Learn about Amazon API Gateway and its role in the project's architecture.

2. **Setup API Gateway and WebSocket** – Create and configure the HTTP API, integrate with AWS Lambda, configure CORS, create Stages, and deploy the API.
