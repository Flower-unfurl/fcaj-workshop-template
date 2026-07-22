---
title: "Worklog Week 12"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.12 </b> "
---

### Week 12 Goals:

* Configure SQS combined with CloudWatch and AWS X-Ray for monitoring, tracing, and asynchronous processing of match data.
* Build and test the complete API Gateway system (Routes: $connect, $disconnect, game-action, matchfinding, ...).
* Fully deploy the project on AWS Amplify Hosting, configure an automated CI/CD pipeline, and finalize the internship report.

### Tasks to Be Completed This Week:
| Day | Task                                                                                                                                                                           | Start Date   | End Date        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | --------------- |
| Mon | Set up SQS trigger to Lambda Post Match Worker. <br> Set up CloudWatch (logs, metrics, errors, latency) and X-Ray to trace the request flow.                                  | 21/07/2026   | 21/07/2026      |
| Tue | Finalize Lambda Post Match Worker to process data flow from SQS into DynamoDB. <br> Test Lambda functions via Test Events.                                                    | 22/07/2026   | 22/07/2026      |
| Wed | Build API Gateway with routes ($connect, $disconnect, matchfinding-start, game-action, game-timeout, game-surrender, deck-save).                                              | 23/07/2026   | 23/07/2026      |
| Thu | Enable Lambda proxy integration for all routes (set to true). <br> Test all API routes using Postman.                                                                         | 24/07/2026   | 24/07/2026      |
| Fri | Deploy the project on AWS Amplify Hosting and fine-tune CI/CD. <br> Improve the user interface for a smoother experience and finalize the internship report.                  | 25/07/2026   | 25/07/2026      |

### Week 12 Results Achieved:

* Built an efficient asynchronous processing pipeline: used SQS to receive data from the Lambda End Match function and hand it off to the Lambda Post Match Worker for gradual DynamoDB writes, effectively resolving network congestion or server crashes when multiple matches end simultaneously.

* Integrated CloudWatch to collect comprehensive logs, metrics, error rates, and Lambda function latency; integrated AWS X-Ray to trace the complete request flow through API Gateway and Lambda for rapid error diagnosis.

* Successfully initialized and configured all Routes on the WebSocket API Gateway, enabled Lambda proxy integration, and successfully tested all scenarios using Postman.

* Deployed the complete Frontend/Backend project on AWS Amplify Hosting and established an automated CI/CD pipeline that updates upon each code push.

* Optimized the entire user interface, ensured the system operates smoothly and stably, and completed the final internship report.




