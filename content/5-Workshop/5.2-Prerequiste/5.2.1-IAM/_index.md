---
title: "Prerequisites"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 5.2.1 </b> "
---

Before starting this workshop, you need to prepare the required AWS resources and permissions to ensure that the application can be deployed successfully.

## IAM Role for AWS Lambda

Create an IAM Role for AWS Lambda and attach the necessary permissions. This role allows Lambda functions to access AWS services used in the application, such as **Amazon DynamoDB**, **Amazon Cognito**, **Amazon CloudWatch Logs**, **Amazon SQS**, and other required resources.

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21022537.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21022934.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21023113.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/iam_for_lamda1.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/iam_for_lamda2.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21023131.png)

---

## IAM Role for Amazon SQS

Create an IAM Role that allows **AWS Lambda** to send and receive messages from **Amazon SQS**.

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs.png)

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs3.png)

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs2.png)

---

## Attach Amazon SQS Policy to Lambda

Attach the required **Amazon SQS policy** to the Lambda execution role so that Lambda functions can read from and write to the SQS queue.

![sqs](/images/5-Workshop/5.2-Prerequisite/addsqspolicyforlambda.png)

---

## Amazon Cognito

Before deploying the application, you need to create an **Amazon Cognito User Pool** to manage user authentication.

In the next section (**5.3 Configure Amazon Cognito**), you will:

- Create a new **User Pool**.
- Configure **Email** as the sign-in method.
- Create an **App Client**.
- Retrieve the **User Pool ID**.
- Retrieve the **Client ID**.
- Retrieve the **Client Secret**.

These values will be used later to configure the backend application and enable user authentication.
