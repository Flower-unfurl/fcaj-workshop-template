---
title: "Set up API Gateway and WebSocket"
date: 2024-01-01
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

In this section, you will configure **Amazon API Gateway** to expose the backend services of the application. API Gateway acts as the entry point between the frontend and the AWS Lambda functions, enabling secure and scalable communication through HTTP APIs.

You will also configure the API so that it can communicate with the frontend application deployed on AWS Amplify. Proper routing, Lambda integrations, deployment stages, and CORS settings ensure that requests from users are processed correctly.

By the end of this section, the application will have a fully functional HTTP API that is ready to integrate with the frontend and backend services.

## Objectives

- Understand the role of Amazon API Gateway in the system architecture.
- Learn the basic concepts of HTTP APIs.
- Configure API routes and Lambda integrations.
- Configure CORS to allow requests from the frontend.
- Deploy the API and verify its availability.

## Content

1. **Introduction** – Learn about Amazon API Gateway and its role in the project architecture.

2. **Set up API Gateway and WebSocket** – Create and configure the HTTP API, integrate Lambda functions, configure CORS, create deployment stages, and deploy the API.
