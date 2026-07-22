---
title: "Set up API Gateway and WebSocket"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 5.4.2 </b> "
---

#### Overview

In this section, you will configure **Amazon API Gateway** for your application. The API Gateway will serve as the entry point for client requests and forward them to AWS Lambda functions. You will create the API, configure routes, integrate Lambda functions, configure CORS, create deployment stages, and deploy the API.

---

## Step 1. Configure the Socket API Gateway

1. Open the **Amazon API Gateway** console.
2. Choose **HTTP API**.
3. Enter the API name and the required configuration.
4. Continue to the next step.

HTTP APIs are well suited for serverless applications because they provide low latency, lower cost, and seamless integration with AWS Lambda.

![Configure HTTP API](/images/5-Workshop/5.4-API/api_gateway1.png)

---

## Step 2. Create Routes

Routes define how the API handles incoming client requests.

1. Choose **Add routes**.
2. Specify the appropriate **Resource Path** for your application.

Each route represents an endpoint that clients can invoke through API Gateway.

![Create Routes](/images/5-Workshop/5.4-API/api_gateway2.png)

---

## Step 3. Integrate AWS Lambda

After creating the routes, connect each route to an AWS Lambda function.

1. Select **Lambda** as the **Integration Type**.
2. Choose the Lambda function that will handle requests for the selected route.
3. Confirm the configuration.

Whenever a client sends a request to the route, API Gateway automatically invokes the corresponding Lambda function.

![Attach Lambda Integration](/images/5-Workshop/5.4-API/api_gateway3.png)

---

## Step 4. Create a Stage

A stage represents a deployed version of your API.

1. Create a new stage.
2. Enter a stage name, such as **dev** or **production**.
3. Continue with the deployment process.

Using stages allows you to manage multiple environments while using the same API configuration.

![Create Stage](/images/5-Workshop/5.4-API/api_gateway4.png)

---

## Step 5. Review the Configuration

Before creating the API, review all configuration settings, including the routes, Lambda integrations, and deployment stage.

If everything is correct, choose **Create**.

![Review Configuration](/images/5-Workshop/5.4-API/api_gateway5.png)

---

## Step 6. Verify the Routes

After the API has been created successfully, review the configured routes.

Ensure that each route is associated with the correct Lambda function.

![API Routes](/images/5-Workshop/5.4-API/api_gateway6.png)

---

## Step 7. Deploy the API

Choose **Deploy** to publish the API.

Once deployed, API Gateway generates an **Invoke URL** that clients can use to send requests to the API.

![Deploy API](/images/5-Workshop/5.4-API/api_gateway7.png)

---

## Step 8. Deployment Completed

Once the deployment is complete, the API is ready for use.

You can test the API using **Postman**, **curl**, or your web application.

![Deployment Completed](/images/5-Workshop/5.4-API/api_gateway8.png)

---

## Step 9. Configure the HTTP API Gateway

1. Navigate to **API Gateway → HTTP API**.
2. Configure the API as shown in the figure, then choose **Create**.
3. Create the route **ANY /{proxy+}**.
4. Review the route configuration.

This step ensures that client requests are forwarded to the appropriate AWS Lambda function.

![Configure HTTP API](/images/5-Workshop/5.4-API/api_gateway13.png)

![Verify Route](/images/5-Workshop/5.4-API/api_gateway9.png)

---

## Step 10. Verify the Lambda Integration

Next, open the **Integrations** section to review the connection between Amazon API Gateway and AWS Lambda.

Verify the following:

- The integration type is **AWS Lambda**.
- The correct Lambda function is selected.
- The **Payload Format Version** is configured correctly.

Verifying these settings ensures that API Gateway can successfully invoke the Lambda function when processing client requests.

![Verify Lambda Integration](/images/5-Workshop/5.4-API/api_gateway10.png)

---

## Step 11. Configure CORS

If your frontend application accesses the API from a different domain, configure **Cross-Origin Resource Sharing (CORS)**.

1. Open the **CORS** configuration page.
2. Specify the **Allowed Origins**.
3. Select the allowed HTTP methods, such as **GET**, **POST**, and **OPTIONS**.
4. Add the required **Access-Control** headers.
5. Add the **AWS Amplify URL** to **Access-Control-Allow-Origin**.
6. Save the configuration.

Enabling CORS allows browsers to securely send requests from the frontend application to Amazon API Gateway.

![Configure CORS](/images/5-Workshop/5.4-API/api_gateway11.png)

---

## Step 12. Verify the Deployment Stage

Finally, open the **Stages** section to verify that the API has been deployed successfully.

1. Choose **Create**, enter a stage name, and enable **Auto Deployment**.
2. Edit the stage configuration as shown in the figure.

Verify the following:

- The deployment stage has been created successfully.
- The latest deployment has been published.
- The API is ready to receive client requests.

After completing this step, the HTTP API is fully configured and ready to integrate with your application.

![Verify Deployment Stage](/images/5-Workshop/5.4-API/api_gateway12.png)
