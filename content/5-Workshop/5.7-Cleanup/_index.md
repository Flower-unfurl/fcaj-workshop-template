---
title: "Cleanup Resources"
date: 2024-01-01
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
---

## Overview

After completing the workshop, you should remove all AWS resources created during the deployment to avoid unnecessary charges.

The resources used in this workshop include:

- Amazon Cognito
- AWS Lambda
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- AWS IAM (Users, Roles, and Policies)
- AWS Secrets Manager
- AWS Key Management Service (KMS)
- AWS Amplify Hosting

> **Note:** Only delete the resources created specifically for this workshop. Do not remove resources used by other projects.

---

## Step 1. Delete AWS Lambda Functions

1. Open the **AWS Lambda Console**.
2. Select all Lambda functions created for the project.
3. Choose **Actions → Delete**.
4. Type **confirm** to proceed.

After deletion, all Lambda functions will be permanently removed.

![Delete Lambda](/images/5-Workshop/5.7-Cleanup/lambda_cleanup.png)

---

## Step 2. Delete HTTP API and WebSocket API

1. Open the **Amazon API Gateway Console**.
2. Select the APIs created for this workshop.
3. Choose **Delete**.
4. Confirm the deletion.

This removes all API endpoints, routes, and deployment stages.

![Delete API Gateway](/images/5-Workshop/5.7-Cleanup/api_cleanup1.png)
![Delete API Gateway](/images/5-Workshop/5.7-Cleanup/api_cleanup2.png)

---

## Step 3. Delete Amazon SQS Queue

1. Open the **Amazon SQS Console**.
2. Select the project queue.
3. Choose **Delete**.
4. Confirm by entering the queue name.

After deletion, the queue will no longer store or process messages.

![Delete SQS](/images/5-Workshop/5.7-Cleanup/sqs_cleanup.png)

---

## Step 4. Delete DynamoDB Tables

1. Open the **Amazon DynamoDB Console**.
2. Select the project tables.
3. Choose **Delete Table**.
4. Enter the table name to confirm.

All data stored in the table will be permanently removed.

![Delete DynamoDB](/images/5-Workshop/5.7-Cleanup/dynamodb_cleanup.png)

---

## Step 5. Delete Amazon Cognito User Pool

1. Open the **Amazon Cognito Console**.
2. Navigate to **User Pools**.
3. Select the User Pool created for this workshop.
4. Choose **Delete User Pool**.
5. Confirm the deletion.

All users and authentication settings associated with the User Pool will be permanently removed.

![Delete Cognito](/images/5-Workshop/5.7-Cleanup/cognito_cleanup.png)

---

## Step 6. Delete IAM Resources

Finally, remove the IAM resources created for this workshop.

These include:

- IAM User
- IAM Role

Follow these steps:

1. Detach all policies from the IAM User or Role.
2. Delete the IAM Role.
3. Delete the IAM User.

> IAM Users and Roles cannot be deleted while they still have attached policies or active access keys.

![Delete IAM User](/images/5-Workshop/5.7-Cleanup/iam_user_cleanup.png)
![Delete IAM Role](/images/5-Workshop/5.7-Cleanup/iam_role_cleanup.png)

---

## Step 7. Delete AWS Secrets Manager Secrets

If you used **AWS Secrets Manager** to store sensitive information such as Cognito Client Secrets or API keys, you should delete these secrets after completing the workshop.

1. Open the **AWS Secrets Manager** console.
2. Select the secrets created for this project.
3. Choose **Delete secret**.
4. Confirm the deletion.

> **Note:** Only delete the secrets that were created specifically for this workshop.

![Delete Secret](/images/5-Workshop/5.7-Cleanup/secret_cleanup.png)

---

## Step 8. Delete AWS KMS Keys

If your project uses **AWS Key Management Service (KMS)** to encrypt data or manage secrets, you should remove the Customer Managed Keys created during the workshop.

1. Open the **AWS KMS** console.
2. Select **Customer managed keys**.
3. Choose the key created for this project.
4. Select **Schedule key deletion**.
5. Choose a waiting period (for example, **7 days**).
6. Confirm the deletion request.

> AWS KMS does not allow immediate deletion. Keys must first be scheduled for deletion after the selected waiting period.

![Delete KMS](/images/5-Workshop/5.7-Cleanup/kms_cleanup.png)

---

## Step 9. Delete the AWS Amplify Application

After completing the workshop, you can remove the application deployed with **AWS Amplify Hosting**.

1. Open the **AWS Amplify Console**.
2. Select the deployed application.
3. Navigate to **App settings → General settings**.
4. Scroll to the bottom of the page.
5. Choose **Delete app**.
6. Enter the application name to confirm.

After deletion:

- The hosted website will become unavailable.
- AWS Amplify Hosting will stop serving the application.
- The deployment history will be permanently removed.

![Delete Amplify](/images/5-Workshop/5.7-Cleanup/amplify_cleanup.png)

---

## Completion

Congratulations!

You have successfully completed the workshop and cleaned up all AWS resources created throughout the project, including:

- Amazon Cognito
- AWS Lambda
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- AWS Identity and Access Management (IAM)
- AWS Secrets Manager
- AWS Key Management Service (KMS)
- AWS Amplify Hosting

Cleaning up these resources after completing the workshop helps you:

- Avoid unnecessary AWS charges.
- Keep your AWS account organized and clean.
- Remove unused cloud resources.
- Prepare a clean environment for future workshops or projects.
