---
title: "Deploy Logic with AWS Lambda"
date: 2024-01-01
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

In this section, you will deploy the source code, configure environment variables, and test the connection for the **AWS Lambda** functions of the Chrono Genesis Game project. The following guide will walk you through 9 detailed steps to initialize and fully configure a Lambda function.

---

## I. Overview

Before proceeding with detailed configurations on the AWS Console, below is the standard 5-step process for developing, bundling, and deploying **TypeScript/Node.js** source code to AWS Lambda:

### 1. Initialization & Environment Setup
Set up the project and install core dependencies, including `esbuild` (the bundler/compiler) and the AWS SDK:

```bash
npm init -y
npm install @aws-sdk/client-dynamodb @aws-sdk/client-apigatewaymanagementapi
npm install --save-dev typescript @types/node esbuild
```

### 2. Source Code Structure Organization
Apply a modular directory structure, clearly separating Lambda functions (handlers) and shared utility code (utils) to optimize maintenance:

```plaintext
📦 lambda-backend
 ┣ 📂 src
 ┃ ┣ 📂 connectHandler/     ┗ 📜 index.ts   # Main logic handler
 ┃ ┣ 📂 processGameEngine/  ┗ 📜 index.ts
 ┃ ┗ 📂 utils/              ┗ 📜 dynamo.ts  # Shared module (e.g., DB connection)
 ┣ 📜 package.json
 ┗ 📜 tsconfig.json
```

### 3. Compilation & Bundling (esbuild)
Use `esbuild` to transpile TypeScript to JavaScript, while also bundling and minifying everything into a single `index.js` file. This step helps reduce file size and optimize Cold Start time:

```bash
npx esbuild src/connectHandler/index.ts --bundle --minify --sourcemap --platform=node --target=es2020 --outfile=dist/connectHandler/index.js
```

### 4. Source Code Packaging (Zip)
Compress the compiled `.js` file into a `.zip` format according to the execution standards of AWS Lambda:

```bash
cd dist/connectHandler
zip -r connectHandler.zip index.js
```

### 5. Source Code Deployment
Deploy the `.zip` build to AWS Lambda using one of the following two methods:

- **Via AWS Console**: On the Lambda function configuration interface, select the **Code** tab **> Upload from > .zip file**.
- **Via AWS CLI** (Recommended for CI/CD): Run the command to automatically update the source code:

```bash
aws lambda update-function-code --function-name Chrono-ConnectHandler --zip-file fileb://connectHandler.zip
```

---
### Initialize a new Lambda function
Navigate to the AWS Lambda service console on the AWS Management Console. Click the **Create function** button to start creating a new Lambda function.

**Technical Purpose:** Initialize the serverless computing environment for the Chrono Genesis Game project, which will contain the business logic code for the game (e.g., connecting, processing turns, etc.).

![Create Lambda Function](/images/5-Workshop/overrall-lambda/1.%20Vao%20service%20Lambda%20-%20chon%20Create%20Lambda.png)

---

### Configure basic settings and permissions (Execution Role)
On the "Create function" screen, perform the following:
1. Select **Author from scratch**.
2. Under **Function name**, enter the function name (e.g., `StartMatch-function`).
3. Select the pre-configured Role for the project: `Chrono-lambda-execution-role`.
4. Click **Create function**.

**Technical Purpose:** Set up the name and permissions for the Lambda function through an IAM Role. Assigning the `Chrono-lambda-execution-role` ensures the Lambda has sufficient permissions to access DynamoDB, SQS, or API Gateway to serve the game's data flow.

![Configure name and Role for Lambda](/images/5-Workshop/overrall-lambda/2.%20dat%20ten%20lambda%20-%20enable%20custom%20executtion%20role%20-%20chon%20role%20Chrono-lambda-execution-role.png)

---

### Prepare to upload the source code
Once the function is successfully created, the system redirects you to the function's details screen. Navigate to the **Code** tab. Under **Code source**, select **Upload from** and click on **.zip file**.

**Technical Purpose:** Prepare to deploy the game logic source code (which has been packaged, optimized using esbuild, and compressed into a .zip format) to the AWS Lambda runtime environment.

![Upload zip code file](/images/5-Workshop/overrall-lambda/3.%20Sau%20khi%20tao%20xong%2C%20upload%20file%20code%20lambda%20da%20esbuild%20va%20nen%20thanh%20file%20zip.png)

---

### Launch the Upload dialog
When the **Upload a .zip file** dialog appears, click the **Upload** button to open the File Explorer on your personal computer.

**Technical Purpose:** Begin the process of selecting the source code archive (.zip) from your local machine to transfer it to the AWS cloud.

![Launch upload dialog](/images/5-Workshop/overrall-lambda/4.png)

---

### Select the .zip file and save configuration
Browse to the folder containing the project's source code on your machine, select the `.zip` file corresponding to the logic of the current Lambda function, then click **Save** to start the upload process.

**Technical Purpose:** Upload the carefully packaged executable source code to the AWS Lambda's direct storage repository, preparing for actual logic execution.

![Select zip file and save](/images/5-Workshop/overrall-lambda/5.png)

---

### Verify successful source code upload
When the **"Successfully updated the function..."** notification appears, it confirms that your source code file has been successfully uploaded and deployed.

**Technical Purpose:** Ensure that the latest version of the source code has been safely overwritten into the Lambda function environment and is ready to operate.

![Upload successful](/images/5-Workshop/overrall-lambda/6.%20upload%20thanh%20cong.png)

---

### Configure mock data (Test Event)
To ensure the Lambda processes functions correctly, switch to the **Test** tab on the interface. Here:
1. Select **Edit saved event**.
2. Enter the event name in **Event name** (e.g., `TestConnectEvent`).
3. Paste/format the JSON content in the **Event JSON** pane according to the expected input data payload standard of the game.
4. Click **Save**.

**Technical Purpose:** Configure a mock event (Test Event) to locally verify whether the newly uploaded source code logic works as designed before integrating it into the real API system.

![Configure Test Event](/images/5-Workshop/overrall-lambda/7.%20De%20dam%20bao%20lambda%20xu%20ly%20dung%20chuc%20nang%2C%20co%20the%20test%20truoc%20bang%20cach%20truy%20cap%20vao%20tab%20test%20event%20trong%20lambda.png)

---

### Run the test and verify the results
Check the returned results in the **Execution result** pane.
If the screen shows a **succeeded** status (e.g., with `statusCode: 200` and a successful body content), it proves your function operates correctly.

**Technical Purpose:** Independently verify that the Lambda function successfully processes user requests.

![Test successful result](/images/5-Workshop/overrall-lambda/8.%20Vi%20du%20test%20connectHandler%20thanh%20cong.png)

---

### Verify the WebSocket connection Trigger
Navigate to the **Configuration** > **Triggers** tab. Check the current Trigger list.
Ensure that the trigger source is correctly linked to **API Gateway** and routed to the correct flow of the corresponding WebSocket API.

**Technical Purpose:** Integrate the Lambda function into the actual network architecture. This action establishes the mandatory bridge for Amazon API Gateway to forward real-time events from players (via WebSocket connections) directly to the business logic handling Lambda function.

![Verify WebSocket Trigger](/images/5-Workshop/overrall-lambda/9.%20kiem%20tra%20Trigger%2C%20dam%20bao%20cac%20lambda%20cho%20websocket%20deu%20trigger%20vao%20api%20websocket%20gateway%20qua%20route.png)

---
## II. Configure Lambda Functions

### 1. Configure HTTP API Lambda Functions

Next, we will set up the Lambda function specialized in handling HTTP API (RESTful) requests from players, taking on foundational functions such as Deck management, Leaderboard lookup, and Rank.

#### Step 1: Initialize the chrono-http-backend Lambda function
At the AWS Lambda management console, click **Create function** and configure the basic parameters:
1. Select the **Author from scratch** option.
2. **Function name:** Enter the function name as `chrono-http-backend`.
3. **Runtime:** Choose an appropriate execution environment (e.g., `Node.js 20.x` or `Node.js 24.x`).
4. **Execution role:** Expand the Change default execution role section, select **Use an existing role**, and assign permissions via the `Chrono-lambda-execution-role` role.
5. Click the **Create function** button to complete.

**Technical Purpose:** Create an independent backend processing environment to receive and respond to static HTTP Requests. Reusing the `Chrono-lambda-execution-role` role ensures the function has sufficient read/write access permissions to DynamoDB.

![Create chrono-http-backend function](/images/5-Workshop/Lambda%20HTTP/1.png)

---

#### Step 2: Configure source code and environment for HTTP Backend
After the `chrono-http-backend` function is successfully created, proceed to deploy the source code and set up the environment:
1. Navigate to the **Code** tab, click **Upload from** > **.zip file**, and upload the file containing the HTTP API processing logic (e.g., `chrono-http-backend.zip`). Wait for the successful update notification.
2. Navigate to the **Configuration** > **Environment variables** tab. Add the necessary security environment variables to communicate with the Database (such as `DB_SECRET_NAME` or table configuration information).
3. Click **Save** to apply the changes and be ready to integrate with the HTTP API Gateway in the next steps.

**Technical Purpose:** Provide executable source code and secure dynamic configurations so the Lambda function can process RESTful APIs and interact smoothly with the centralized data repository.

![Configure chrono-http-backend](/images/5-Workshop/Lambda%20HTTP/2.chrono-http-backend.png)

---

## 2. Configure WebSocket API Lambda Functions

In this section, we will dive into detailed configuration for each Lambda function responsible for handling real-time event streams via WebSocket.

#### Lambda Function: connectHandler
**Role:** Handles recording the player's device when the initial WebSocket connection is established, storing user identification information in the system.
- **Step 1: Initialize function:** Create a new Lambda function named `ConnectHandler`. Assign execution permissions using the `Chrono-lambda-execution-role` role.
- **Step 2: Deploy source code:** On the details screen, select the **Code** tab, click **Upload from > .zip file**, and upload the source code file handling the original connection.
- **Step 3: Setup Trigger:** Open the API Gateway interface, select the project's existing WebSocket API. Navigate to the `$connect` route and set the Integration type to point to the newly created `ConnectHandler` function.

![Create connectHandle source code](/images/5-Workshop/3.%20Lambda%20websocket/connectHandle/Screenshot%202026-07-21%20024153.png)
![Setup connectHandle trigger](/images/5-Workshop/3.%20Lambda%20websocket/connectHandle/Screenshot%202026-07-25%20170040.png)

---

#### Lambda Function: disconnectHandler
**Role:** Cleans up old connection data, automatically removing the `connectionId` from the database when the player exits the game or loses signal/disconnects.
- **Step 1: Create function and configure Code:** Initialize the `DisconnectHandler` function and upload the corresponding `.zip` source code.
- **Step 2: Configure disconnect Route:** Similar to the connect function, return to API Gateway and point the `$disconnect` route to this `DisconnectHandler` function so the AWS system automatically calls it upon disconnection.

![Configure disconnectHandler](/images/5-Workshop/3.%20Lambda%20websocket/disconnectHandler/1.png)

---

#### Lambda Function: startMatch
**Role:** Triggered when the Matchmaking system has gathered enough players. The function is responsible for the initial card dealing, setting up HP, and notifying the start of the match.
- **Step 1: Deploy StartMatch function:** Upload the source code containing the Game State Initialization logic.
- **Step 2: Configure environment variables (if any):** Enter parameters defining starting health or maximum number of cards via the Configuration > Environment variables tab.
- **Step 3: Configure Test Event:** Click **Test > Configure test event**. Paste a mock payload containing 2 players' `connectionId`s to ensure the card dealing logic does not generate errors. Run the test and verify the `statusCode: 200` result.

![Configure startMatch](/images/5-Workshop/3.%20Lambda%20websocket/startMatch/Screenshot%202026-07-25%20171353.png)

---

#### Lambda Function: processGameEngine
**Role:** This is the Core Engine arbitrating all logic whenever a player plays a card, uses a skill, or ends a turn.
- **Step 1: Upload source code:** Due to the large size of the Game Engine logic, upload the `.zip` file containing the game's entire ruleset.
- **Step 2: Attach WebSocket Route:** At API Gateway, create a custom route (e.g., `action` or `playCard`) and choose Lambda proxy integration pointing directly to the `ProcessGameEngine` function.
- **Step 3: Grant DynamoDB access permissions:** Re-verify the function's IAM Role to ensure it has sufficient `UpdateItem` and `GetItem` permissions to continuously change the match state.

![Configure processGameEngine](/images/5-Workshop/3.%20Lambda%20websocket/processGameEngine/1.png)

---

#### Lambda Function: handleTimeout
**Role:** Takes on the countdown task, automatically skipping a player's turn if they take no action within the specified timeframe.
- **Step 1: Initialize function:** Upload the source code for the `HandleTimeout` function.
- **Step 2: Setup SQS Trigger:** At the Configuration > Triggers tab, click **Add trigger**, select the **SQS** service, and connect to the `Chrono-Timeout-Queue` queue.
- **Step 3: Create Test Event for SQS:** Switch to the Test tab, create a new event simulating the SQS Message payload format containing the `matchId`.
- **Step 4: Run test:** Click Test to check. See the Execution result report Succeeded, ensuring the forced turn-end message is generated accurately.

![Create handleTimeout function](/images/5-Workshop/3.%20Lambda%20websocket/handleTimeout/1..png)
![Setup handleTimeout trigger](/images/5-Workshop/3.%20Lambda%20websocket/handleTimeout/2.png)
![Create handleTimeout test event](/images/5-Workshop/3.%20Lambda%20websocket/handleTimeout/3.%20Test%20event.png)
![handleTimeout test result](/images/5-Workshop/3.%20Lambda%20websocket/handleTimeout/4.%20Test%20result.png)

---

#### Lambda Function: cancelMatch
**Role:** Catches the signal from a player when they actively click the "Cancel matchmaking" button, removing their information from the waiting queue.
- **Step 1: Upload Code:** Initialize the function and upload the code snippet to delete the Record in DynamoDB's Matchmaking table.
- **Step 2: Map API Gateway Route:** Create a separate WebSocket route (e.g., `$cancelMatch`) and point it to this function.

![Configure cancelMatch](/images/5-Workshop/3.%20Lambda%20websocket/cancelMatch/1.png)

---

#### Lambda Function: endMatch
**Role:** Calculates the final result (win/loss), adds/subtracts Elo/Rank, and closes the match stream when one side's HP reaches 0.
- **Step 1: Configure EndMatch function:** Update the `.zip` source code file. Ensure the code has a mechanism to call SQS to offload heavy rank calculations to a Background Worker if necessary.
- **Step 2: Expanded permissions:** If this function calls 3rd party services or EventBridge, add the appropriate permissions to the `Chrono-lambda-execution-role`.

![Configure endMatch](/images/5-Workshop/3.%20Lambda%20websocket/endMatch/1.png)

---

### 3. Configure Worker Lambda Functions

Besides direct API processing functions, the Chrono Genesis Game system also uses Lambda Workers running silently in the background (Background Workers). They play a role in processing time-consuming or periodically scheduled tasks to reduce the load on the main game engine.

#### Lambda Function: postMatchWorker
**Role:** Takes on post-match processing tasks immediately after a match ends. This worker recalculates scores (Elo/Rank), updates match history, and awards prizes to the winner without clogging the real-time processing flow.
- **Step 1: Initialize Worker function:** Access the AWS Lambda interface, click **Create function**. Name the function `PostMatchWorker`. Set the Runtime to Node.js and assign execution permissions via the `Chrono-lambda-execution-role` role. Then, proceed to upload the `.zip` source code.
- **Step 2: Setup SQS Trigger:** Go to the **Configuration > Triggers** tab. Select **Add trigger** and configure the trigger source as **SQS**. Specify the Queue containing match results (e.g., `Chrono-PostMatch-Queue`) so that whenever the `endMatch` function shoots a message here, the worker automatically wakes up.
- **Step 3: Configure Test Event:** Click on the **Test** tab, select **Configure test event**. Name the event `PostMatchTest`. Create a JSON snippet simulating a standard SQS message format, where the `body` section contains the ID of the just-concluded match and the winner/loser information.
- **Step 4: Check execution result:** Click **Test** and observe the **Execution result** pane. A green `Succeeded` status signals the Worker successfully read the SQS message, processed the data, and updated accurately into DynamoDB.

![Create postMatchWorker function](/images/5-Workshop/Lambda%20worker/postMatchWorker/1.png)
![Setup SQS trigger](/images/5-Workshop/Lambda%20worker/postMatchWorker/2.png)
![Configure Test Event](/images/5-Workshop/Lambda%20worker/postMatchWorker/3.%20Test.png)
![Check result](/images/5-Workshop/Lambda%20worker/postMatchWorker/4.%20Test%20result.png)

---

#### Lambda Function: rebuildLeaderboardRank
**Role:** Is a specialized Cron Job, responsible for scanning all players' scores and resorting the Leaderboard on a periodic schedule.
- **Step 1: Initialize Cron function:** Similar to other functions, click **Create function** with the name `RebuildLeaderboardRank`, select the Node.js Runtime, set up the corresponding IAM Role, and upload the `.zip` source code.
- **Step 2: Configure EventBridge Trigger:** At the **Configuration > Triggers** tab, click **Add trigger** but this time choose the **EventBridge (CloudWatch Events)** service.
- **Step 3: Setup Schedule:** Create a new Rule in EventBridge. Configure the **Schedule expression** field (e.g., using cron `cron(0 0 * * ? *)`) so the system automatically calls this function exactly at 12 midnight every day, ensuring the leaderboard is always refreshed automatically.

![Create rebuildLeaderboardRank function](/images/5-Workshop/Lambda%20worker/rebuildLeaderboardRank/1.png)
![Configure EventBridge](/images/5-Workshop/Lambda%20worker/rebuildLeaderboardRank/2.png)
