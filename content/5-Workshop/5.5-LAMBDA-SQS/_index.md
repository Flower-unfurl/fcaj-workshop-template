---
title: "Deploying Logic with AWS Lambda & SQS"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

In this section, you will deploy the source code, configure environment variables, and test the connection for the **ConnectHandler-function** on AWS Lambda.

---

### 1. Create Lambda Functions

Before deploying the source code, you need to create the AWS Lambda functions that will be used throughout the system.

#### Step 1

Navigate to the **AWS Lambda** service, select **Functions**, and then click **Create function**.

#### Step 2

On the **Create function** page, choose **Author from scratch**.

Configure the following settings:

- **Function name:** Enter a name based on the function's purpose (for example, `ConnectHandler-function`).
- **Runtime:** `Node.js 24.x`.
- Expand **Additional settings**.
- Enable **Custom execution role**.
- Select the IAM role that was created during the previous setup step (for example, **Chrono-Lambda-Execution-Role**).

After completing the configuration, click **Create function**.

![Create Lambda Function](/images/5-Workshop/5.5-Policy/set_up_aws_lambda1.png)

#### Step 3

Repeat the same process to create the remaining Lambda functions:

- **DisconnectHandler-function**
- **StartMatch-function**
- **HandleTimeout-function**
- **ProcessGameEngine-function**
- **SaveDeck-function**
- **CancelMatch-function**
- **EndMatch-function**
- **PostMatchWorker-function**
- **chrono-http-backend**

After all functions have been created, the Lambda function list should look similar to the image below.

![Lambda Functions List](/images/5-Workshop/5.5-Policy/set_up_aws_lambda2.png)

---

### 2. Deploy the Lambda Function Source Code

1. Open the **ConnectHandler-function** in the AWS Lambda console and navigate to the **Code** tab. Click **Upload from** and choose **.zip file**.

   ![Upload Lambda ZIP file](/images/5-Workshop/5.5-Policy/10.png)

   ![Upload Lambda ZIP file](/images/5-Workshop/5.5-Policy/806.png)

2. In the popup window, click **Upload** (or **Choose file**) and select the pre-packaged `index.zip` file from your local machine. Then click **Open** to upload the code.

![Upload Lambda ZIP file](/images/5-Workshop/5.5-Policy/55.png)

3. Wait a few seconds until the green confirmation message **"Successfully updated the function ConnectHandler-function"** appears.

   ![Upload completed successfully](/images/5-Workshop/5.5-Policy/818.png)

4. Navigate to the **Configuration** tab and select **Environment variables** from the left-hand menu.

   ![Configure Environment Variables](/images/5-Workshop/5.5-Policy/153.png)

5. Click **Edit**, then select **Add environment variable**.

6. Add the following environment variable to securely connect to the database:

| Key              | Value                              |
| ---------------- | ---------------------------------- |
| `DB_SECRET_NAME` | `ChronoGame/PartnerDB/Credentials` |

7. Click **Save** to apply the configuration.

![Environment Variables](/images/5-Workshop/5.5-Policy/850.png)

8. Switch to the **Test** tab. Under **Test event**, choose **Create new event**, name it `Test-connection`, then click **Save**.

9. Click the orange **Test** button to execute the Lambda function.

10. Expand **Execution results (Details)** to review the output. If you receive `statusCode: 200`, `body: "Connected successfully."`, and the green message **"Executing function: succeeded"**, the configuration has been completed successfully.

![Lambda Test Result](/images/5-Workshop/5.5-Policy/936.png)

---

### 3. Configure the PostMatchWorker Lambda Function

**Step 1**

Open **PostMatchWorker-function**, navigate to **Configuration** → **Environment variables**, then click **Edit** to configure the database connection environment variables (such as `DB_ACCESS_KEY_ID`, `DB_REGION`, and `DB_SECRET_ACCESS_KEY`).

![Configure Environment Variables](/images/5-Workshop/5.5-Policy/postMatch.png)

**Step 2**

Go to the **Test** tab, choose **Create new event** (or **Edit saved event**), name the event **test-postMatchWorker**, paste the simulated SQS message JSON into the **Event JSON** editor, and click **Save**.

![Create Test Event](/images/5-Workshop/5.5-Policy/723.png)

**Step 3**

Click the orange **Test** button to execute the function. Expand **Execution results (Details)** and verify that the execution succeeds. If the output contains `statusCode: 200` and `body: "Post match processing complete."`, the processing workflow is working correctly.

![Execution Result](/images/5-Workshop/5.5-Policy/641.png)

---

### 4. Configure the ProcessGameEngine Lambda Function

**Step 1**

Open **ProcessGameEngine-function**. Under the **Code** tab, upload the latest source code using the **.zip** upload option. Once the upload is complete, AWS displays the green confirmation message **"Successfully updated the function ProcessGameEngine-function"**.

![Upload Source Code](/images/5-Workshop/5.5-Policy/842.png)

**Step 2**

Go to the **Test** tab, create a new test event, and enter **Test-EndTurn** as the **Event name**. Paste a simulated API Gateway request into the **Event JSON** field, including the `connectionId` and the request body containing the player's `END_TURN` action. Click **Save**.

![Create Test Event](/images/5-Workshop/5.5-Policy/708.png)

---

### 5. Configure the Remaining Lambda Functions

Continue deploying and configuring the remaining Lambda functions:

- **SaveDeck-function**
- **StartMatch-function**
- **HandleTimeout-function**
- **DisconnectHandler**
- **CancelMatch**
- **EndMatch**
- **Chrono-http**

After uploading the source code for each function, configure their required environment variables.

#### Step 1: Update Environment Variables

Open the following Lambda functions one by one:

- **ProcessGameEngine-function**
- **StartMatch-function**
- **HandleTimeout-function**
- **CancelMatch-function**
- **SaveDeck-function**

Navigate to:

**Configuration** → **Environment variables** → **Edit**

- Environment variables for chrono-http-backend
  ![chrono-http-backend](/images/5-Workshop/5.5-Policy/chrono_http_be.png)

- Environment variables for ConnectHandler
  ![ConnectHandler](/images/5-Workshop/5.5-Policy/connect_handler_funtion.png)

- Environment variables for End Match
  ![End Match ](/images/5-Workshop/5.5-Policy/endmatch_funtion.png)

Then update the required environment variables for each function.

![Update Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_variable5.png)

![Update Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_update2.png)

![Update Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_update3.png)

#### Step 2: Configure HandleTimeout Lambda

Open **HandleTimeout-function**, verify all environment variables, and save the configuration.

Update the Lambda settings as shown in the following screenshots.

![Configure HandleTimeout](/images/5-Workshop/5.5-Policy/lambda_HandleTimeout1.png)

![Configure HandleTimeout](/images/5-Workshop/5.5-Policy/lambda_HandleTimeout2.png)

---

### 6. Create the `chrono-turn-timeouts` SQS Queue

To support asynchronous timeout processing, **ProcessGameEngine-function** sends timeout events to an Amazon SQS queue. Therefore, create a dedicated queue for this purpose.

#### Step 1

Open **Amazon SQS** and select **Create queue**.

Under **Details**, configure:

- **Queue type:** Standard
- **Name:** `chrono-turn-timeouts`

![Create Queue](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts1.png)

#### Step 2

Keep the default settings. Ensure that **Server-side encryption** is enabled using **Amazon SQS managed key (SSE-SQS)**, then create the queue.

![Queue Encryption](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts2.png)

#### Step 3

After the queue is created successfully, verify that the **chrono-turn-timeouts** queue is available.

![Queue Created](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts3.png)

---

### 7. Add an SQS Trigger to HandleTimeout Lambda

After creating the queue, configure **HandleTimeout-function** to automatically receive messages from **chrono-turn-timeouts**.

#### Step 1

Open **HandleTimeout-function**.

Navigate to:

**Configuration** → **Triggers** → **Add trigger**

Configure:

- **Source:** Amazon SQS
- **SQS Queue:** `chrono-turn-timeouts`
- **Batch size:** `10`
- Enable **Activate trigger**

Then click **Add**.

![Add SQS Trigger](/images/5-Workshop/5.5-Policy/SQS_lambda_HandleTimeout1.png)

#### Step 2

Wait a few minutes for AWS to complete the trigger configuration.

When the trigger status changes to **Enabled**, **HandleTimeout-function** will automatically receive timeout messages sent from **ProcessGameEngine-function** through the **chrono-turn-timeouts** queue.

![Trigger Enabled](/images/5-Workshop/5.5-Policy/SQS_lambda_HandleTimeout2.png)

---

### 8. Create the `Match-Result-queue`

After configuring timeout processing, create another Amazon SQS queue for post-match processing performed by **PostMatchWorker**.

#### Step 1

Open **Amazon SQS** and click **Create queue**.

Under **Details**, configure:

- **Queue type:** Standard
- **Name:** `Match-Result-queue`

Leave the remaining settings as their default values.

![Create Match Result Queue](/images/5-Workshop/5.5-Policy/246.png)

#### Step 2

Scroll to the **Encryption** section and ensure that **Server-side encryption** is enabled using **Amazon SQS managed key (SSE-SQS)**.

![Encryption Configuration](/images/5-Workshop/5.5-Policy/131.png)

#### Step 3

Under **Access policy**, choose **Basic** and keep the default permission **Only the queue owner**.

![Access Policy](/images/5-Workshop/5.5-Policy/108.png)

#### Step 4

Scroll to the bottom of the page, keep the default settings for **Dead-letter queue** and **Redrive allow policy**, then click **Create queue**.

![Queue Created Successfully](/images/5-Workshop/5.5-Policy/313.png)

---

### 9. Add an SQS Trigger to PostMatchWorker Lambda

Once **Match-Result-queue** has been created, configure **PostMatchWorker-function** to automatically process messages sent by **EndMatch-function**.

#### Step 1

Open **PostMatchWorker-function**.

Navigate to:

**Configuration** → **Triggers** → **Add trigger**

Configure:

- **Source:** Amazon SQS
- **SQS Queue:** `Match-Result-queue`
- **Batch size:** `10`
- Enable **Activate trigger**

Then click **Add**.

![Add Trigger](/images/5-Workshop/5.5-Policy/351.png)

#### Step 2

Wait a few minutes while AWS creates the trigger.

Once the trigger status becomes **Enabled**, **PostMatchWorker-function** will automatically receive messages from **Match-Result-queue** to process post-match tasks.

![Trigger Enabled](/images/5-Workshop/5.5-Policy/324.png)

---
