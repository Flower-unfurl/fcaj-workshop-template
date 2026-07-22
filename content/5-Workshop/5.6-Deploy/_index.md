---
title: "Deploy the System"
date: 2024-01-01
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

In this section, you will deploy the frontend application using **AWS Amplify Hosting**. The application source code is stored in a GitHub repository, and Amplify will automatically build and deploy the application whenever new changes are pushed to the selected branch.

---

## Deploy 1 - Create a New Amplify Application

1. Open the **AWS Amplify** console.
2. Select **Host web app**.
3. Choose **GitHub** as the Git provider.
4. Click **Next**.

> AWS Amplify supports multiple source code providers such as GitHub, GitLab, Bitbucket, and CodeCommit. In this workshop, GitHub is used as the deployment source.

![Deploy 1](/images/5-Workshop/5.6-Deploy/deploy1.jpg)

---

## Deploy 2 - Connect the GitHub Repository

1. Sign in to your **GitHub** account if prompted.
2. Select the repository that contains the project source code.
3. Select the branch to deploy (for example, **dev**).
4. Click **Next**.

> Amplify will monitor the selected branch and automatically trigger a new deployment whenever changes are pushed.

![Deploy 2](/images/5-Workshop/5.6-Deploy/deploy2.jpg)

---

## Deploy 3 - Configure Build Settings

Configure the application settings before deployment.

1. Enter the application name.
2. Verify the automatically detected build settings.
3. Configure the following values:

| Setting                | Value             |
| ---------------------- | ----------------- |
| Frontend build command | `npm run build`   |
| Build output directory | `Front-end/.next` |

4. Leave the remaining settings unchanged.
5. Continue to the next step.

> Amplify automatically detects the project framework. Since this project uses **Next.js**, the default build configuration can be used with minor adjustments.

![Deploy 3](/images/5-Workshop/5.6-Deploy/deploy3.jpg)

---

## Deploy 4 - Configure the Build Specification

Open **Build settings** and verify that the generated **amplify.yml** file matches your project configuration.

The build specification should install dependencies, build the project, and publish the generated artifacts.

After verifying the configuration, save the changes if necessary.

> The **amplify.yml** file defines how AWS Amplify builds and deploys the application.

![Deploy 4](/images/5-Workshop/5.6-Deploy/deploy4.jpg)

---

## Deploy 5 - Configure Environment Variables

Before deploying the application, configure the required environment variables.

Navigate to **Hosting → Environment variables** and add the following variables.

| Variable                        | Description              |
| ------------------------------- | ------------------------ |
| `NEXT_PUBLIC_API_URL`           | API Gateway endpoint     |
| `NEXT_PUBLIC_MATCHMAKING_ROUTE` | Matchmaking API endpoint |
| `NEXT_PUBLIC_WS_URL`            | WebSocket endpoint       |

After all variables have been configured:

1. Save the environment variables.
2. Start the deployment.
3. Wait until the deployment status changes to **Available**.
4. Open the generated Amplify URL to verify that the application is running successfully.

> Environment variables allow the frontend application to communicate with backend services without hardcoding endpoint URLs into the source code.

![Deploy 5](/images/5-Workshop/5.6-Deploy/deploy5.jpg)

---

## Deploy 6 - Verify the Deployment

After starting the deployment process, **AWS Amplify** automatically performs the **Build** and **Deploy** phases of the application.

Navigate to the **Deployments** page to monitor the deployment progress.

Verify the following information:

- The deployment status is **Deployed**.
- Both the **Build** and **Deploy** processes have completed successfully.
- Review the application build duration.
- Confirm the connected GitHub repository and deployment branch.
- Copy the generated **Domain** provided by AWS Amplify to access the deployed application.

If the deployment status is displayed as **Deployed**, it indicates that the application has been successfully published and is ready to serve users.

In addition, whenever new changes are pushed to the connected GitHub repository, AWS Amplify automatically creates a new deployment. Every deployment is recorded in the **Deployment history**, allowing you to review previous versions, inspect build logs, or redeploy an earlier version if necessary.

![Deploy 6](/images/5-Workshop/5.6-Deploy/deploy6.jpg)

---

## Result

Congratulations!

You have successfully deployed the frontend application using **AWS Amplify Hosting**.

Once the deployment is complete, AWS Amplify provides a public **Domain URL** that allows users to access the application over the Internet.

The application is now connected to the selected **GitHub repository**. Whenever changes are pushed to the configured branch, AWS Amplify automatically performs the following tasks:

- Detects new commits.
- Builds the application.
- Deploys the latest version.
- Records the deployment history.

This workflow establishes a **Continuous Deployment (CD)** pipeline, enabling new application versions to be published automatically without requiring manual deployment.

At this point, the entire cloud-based system—including the **Frontend (AWS Amplify Hosting)**, **Backend (AWS Lambda)**, **Amazon API Gateway**, **Amazon Cognito**, **Amazon DynamoDB**, and other supporting AWS services—has been successfully deployed and is ready for use.
