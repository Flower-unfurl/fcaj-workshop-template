---
title: "Worklog Week 10"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.10. </b> "
---


### Week 10 Goals:

* Initiate the Chrono Genesis Game project (a turn-based trading card web game).  
* Complete the Serverless Real-time Architecture design on AWS and deploy the foundational layers (Edge, Auth, Data, Security).

### Tasks to Complete This Week:
| Day | Tasks                                                                                                                                                                                   | Start Date   | End Date        | Reference |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | --------- |
| 2   | - Brainstorm and draw the Serverless Real-time architecture diagram for Chrono Genesis Game <br>                                                                                         | 06/07/2026   | 06/07/2026      |           |
| 3   | - Configure Amazon Route 53 to manage the domain and route player traffic to the system <br> - Integrate AWS WAF to filter malicious requests and protect the system. <br> - Set up AWS Amplify Hosting to store static assets, automate CI/CD, and globally distribute the React/TypeScript interface. <br> | 07/07/2026   | 07/07/2026      |           |
| 4   | - Configure Amazon Cognito to manage player accounts, handle login, and issue JWT Tokens. <br> - Initialize Amazon API Gateway (WebSocket API) combined with a Lambda Authorizer.         | 08/07/2026   | 08/07/2026      |           |
| 5   | - Configure 5 specialized tables on Amazon DynamoDB. <br>                                                                                                                                | 09/07/2026   | 10/07/2026      |           |
| 6   | - Use AWS IAM to set up access permissions between services and AWS KMS to encrypt data stored on DynamoDB. <br> - Integrate AWS X-Ray to trace the entire request processing flow between API Gateway and Lambda. | 10/07/2026   | 10/07/2026      |           |


### Week 10 Results Achieved:

* Completed the overall design diagram and layered Serverless Real-time Architecture for the turn-based trading card web game project on AWS.  

* Successfully deployed the content distribution layer (Edge Layer) with Amazon Route 53, AWS WAF, and AWS Amplify Hosting, ensuring the automatic and secure global distribution of the React/TypeScript interface and static assets.  

* Established the user identity system with Amazon Cognito and successfully configured Amazon API Gateway (WebSocket API) to maintain real-time connections via Connection ID.  

* Successfully initialized the central data storage layer with Amazon DynamoDB using 5 specialized tables to meet read/write requirements.
  
* Successfully integrated security services (IAM, KMS) for permission management and data encryption, while establishing a monitoring foundation with CloudWatch and X-Ray. 



