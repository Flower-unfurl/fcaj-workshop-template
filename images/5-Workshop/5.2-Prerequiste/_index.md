---
title: "Preparation Steps & Amazon Cognito"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
---

## Objectives

Before deploying the system, you need to prepare the necessary AWS resources and configure the user authentication service. In this section, you will set up the required IAM Roles and access permissions for AWS services, and create an **Amazon Cognito User Pool** to manage user registration and login functionalities.

These configurations are the foundation for deploying the backend and frontend in the next steps.

### Why is it necessary to complete this section first?

- **AWS Permissions:** Set up the required IAM Roles and Policies so that services like AWS Lambda and Amazon SQS can communicate with each other securely.
- **User Authentication:** Create an **Amazon Cognito User Pool** to manage users. Information such as **User Pool ID**, **Client ID**, and **Client Secret** will be used when configuring the application's backend.
- **Deployment Preparation:** Completing the preparation steps helps ensure all AWS resources are ready before starting the system deployment.

## Contents

1. [IAM Configuration](5.2.1-iam/)
2. [Amazon Cognito Configuration](5.2.2-cognito/)