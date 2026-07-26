---
title: "Deploy SQS & EventBridge"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

In this section, you will set up **Amazon SQS** and **Amazon EventBridge** — two services that handle asynchronous processing and automated scheduling in the game architecture.

---

## I. Overview
In the architecture of Chrono Genesis Game, **Amazon SQS** is used to decouple processing flows to ensure real-time performance, while **Amazon EventBridge** plays the role of automated scheduling for periodic tasks.

![SQS and EventBridge Overview](/images/5-Workshop/SQS%20%26%20EventBridge/1.overall/1.png)

---

## II. Configure Amazon SQS

### Create a Dead-Letter Queue (DLQ) for Timeouts
**Purpose:** A fallback DLQ to store failed messages that cannot be processed after multiple retries, making debugging easier without disrupting the system.

- **Step 1:** Access the Amazon SQS console, click the **Create queue** button. Under Details, select the queue type as **Standard**.

- **Step 2:** Enter the queue name as `chrono-turn-timeouts-dlq`. In the Configuration section, keep the default Visibility timeout as 30 seconds and Delivery delay as 0 seconds.

![Create DLQ 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/1.png)

- **Step 3:** Scroll down to the Access policy section, check the **Basic** option to keep the default permission configuration.

![Create DLQ 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/2.png)

- **Step 4:** Scroll to the bottom of the page, skip advanced settings, and click the orange **Create queue** button to complete.

![Create DLQ 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/3.png)


![Create DLQ 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/4.png)

### Create the main chrono-turn-timeouts Queue
**Purpose:** Store countdown signals for each player's turn. Leverage the SQS "Delivery delay" feature to schedule a Lambda trigger to automatically skip the turn if the player does not respond.

- **Step 1:** Continue by clicking **Create queue** and selecting **Standard** Queue.

- **Step 2:** Set the queue name to `chrono-turn-timeouts`. Specifically, in the Configuration section, adjust **Delivery delay to 60 seconds** (equivalent to the maximum time for a turn). Keep Visibility timeout at 30 seconds.
![Create Timeout Queue 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/1.png)


- **Step 3:** Set Receive message wait time to 0, and Message retention period to 4 days. Keep Access policy as **Basic**.

![Create Timeout Queue 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/2.png)

- **Step 4:** Enable the **Dead-letter queue** option (select Enabled), then point the Dead-letter queue ARN field to the `chrono-turn-timeouts-dlq` queue created previously. Enter Maximum receives as 10. Then click Create queue.

![Create Timeout Queue 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/3.png)

![Create Timeout Queue 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/4.png)

- **Step 5:** Switch to the AWS Lambda console, open the `processGameEngine` function. Go to the Configuration > Environment variables tab, add the `TURN_TIMEOUT_QUEUE_URL` environment variable, and assign the HTTPS URL of the `chrono-turn-timeouts` queue.
![Create Timeout Queue 5](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/5.%20Add%20env%20sqs%20for%20Lambda%20processGameEngine.png)

- **Step 6:** Repeat the same process for the `handleTimeout` Lambda function: add the `TURN_TIMEOUT_QUEUE_URL` environment variable so this function can retrieve SQS information.
![Create Timeout Queue 6](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/6.%20Add%20env%20sqs%20for%20Lambda%20handleTimeout.png)

- **Step 7:** Repeat the same process for the `startMatch` Lambda function: add the `TURN_TIMEOUT_QUEUE_URL` environment variable so this function can start the countdown timer as soon as cards are dealt.
![Create Timeout Queue 7](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/7.%20Add%20env%20sqs%20for%20Lambda%20startMatch.png)

- **Step 8:** At the overview screen of the **Lambda HandleTimeout-function**, switch to the **Configuration** tab and select the **General configuration** section. Click the **Edit** button to adjust the basic configuration of the function: set Memory to 256 MB and Timeout to 10 seconds. After saving, a green notification banner will appear confirming the successful function update.
![Create Timeout Queue 8](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/8.edit%20general%20configuration%20of%20Lambda%20handleTimeout%20.png)

- **Step 9:** Click the **Add trigger** button of the `handleTimeout` Lambda. At the Trigger configuration window, select SQS as the source, point to the `chrono-turn-timeouts` SQS queue, set Batch size to 10. Check Report batch item failures and click Add.
![Create Timeout Queue 9](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/9.%20trigger%20sqs%20cho%20Lambda%20handleTimeout.png)

![Create Timeout Queue 10](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/10.png)

- **Step 10:** After adding, check the Triggers table of the `handleTimeout` Lambda again to ensure the SQS connection shows an `Enabled` status.


### Create the match-result Queue
**Purpose:** A queue to receive messages as soon as a match concludes. Its role is to relay match data to a background processing flow, ensuring the `endMatch` function responds to the client as quickly as possible.

- **Step 1:** Return to SQS, click **Create queue** and classify as **Standard**.

- **Step 2:** Name it `match-result-queue`. Unlike the timeout queue, keep **Delivery delay at 0** and Visibility timeout at 30 seconds for this queue.
![Create Match Result Queue 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/1.png)

![Create Match Result Queue 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/2.png)

- **Step 3:** Scroll down to the Access policy section, keep the default **Basic** option.
![Create Match Result Queue 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/3.png)

- **Step 4:** Scroll to the bottom of the page and click **Create queue**.
![Create Match Result Queue 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/4.png)

- **Step 5:** Once the queue is successfully created, switch to the **Lambda triggers** tab in the bottom menu.
![Create Match Result Queue 5](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/6.png)

- **Step 6:** At the Add trigger interface of the Lambda function, select the trigger source as **SQS**. In the SQS queue field, search for and select the **`Match-Result-queue`**. Continue setting the Batch size to 10 and Batch window to 5. Ensure the Activate trigger checkbox is selected, then click the **Add** button at the bottom of the page.
![Create Match Result Queue 6](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/7.%20Lambda%20-%20tab%20trigger.png)

- **Step 7:** After successful addition, the system will return you to the overview screen of the **PostMatchWorker-function**. Switch to the **Configuration** tab and select the **Triggers** section, you will see the **SQS Match-Result-queue** just configured has been successfully linked to the Lambda function.
![Create Match Result Queue 7](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/8.%20Add%20trigger.png)

---

## III. Configure Amazon EventBridge
**Purpose:** Schedule (Cron Job) to automatically invoke the `rebuildLeaderboardRank` function periodically to rearrange the leaderboard.

- **Step 1:** Access the Amazon EventBridge console, select **Schedules** on the left toolbar, then click the orange **Create schedule** button.

- **Step 2:** In Step 1 (Specify schedule detail), enter the Schedule name as `rebuild-global-leaderboard`. Select `default` for Schedule group.

![EventBridge 1](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/1.%20Create%20schedule.png)

![EventBridge 2](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/2.%20step%201.png)

- **Step 3:** Scroll down to the Schedule pattern section, select **Recurring schedule**. Check **Rate-based schedule** and set the frequency to **10 minutes** (once every 10 minutes). Click Next.
![EventBridge 3](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/3.%20step%201.png)

- **Step 4:** In Step 2 (Select target), for Target API, choose **AWS Lambda**. In the Lambda function field, specify the target function as `Rebuild_Leader_Board_Function` (or `rebuildLeaderboardRank`). Click Next.
![EventBridge 4](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/4.%20step%202.png)

- **Step 5:** In Step 3 (Settings), ensure the Schedule state is Enabled. For Action after schedule completion, choose **NONE**.

- **Step 6:** Scroll down to the Retry policy section, set **Retry attempts** to 2 and **Maximum retry delay** to 10. For Dead-letter queue, select **None**. Click Next.
![EventBridge 5](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/5.%20step%203.png)

- **Step 7:** In the Review step (Step 4), check the configuration summary: Name, Rate expression (`rate (10 minutes)`), Target.
![EventBridge 7](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/7.%20step%204.png)

- **Step 8:** Verify that the Execution role has been automatically assigned the appropriate permissions. Click the **Create schedule** button at the bottom.
![EventBridge 8](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/8.%20step%204.png)

- **Step 9:** You can return to the AWS Lambda design interface for the `rebuildLeaderboardRank` function, where you will see the EventBridge (CloudWatch Events) icon automatically appear in the Triggers section with a successful connection status.
![EventBridge 9](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/9.%20Lambda%20rebuildLeaderboardRank%20da%20duoc%20cap%20nhat%20trigger.png)
