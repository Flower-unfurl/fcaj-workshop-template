---
title: "Worklog Week 11"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.11. </b> "
---


### Week 11 Goals:

* Build and program the Business Logic Layer.  
* Deploy specialized AWS Lambda functions to handle the match lifecycle, from the start, in-turn actions, to combat mechanics.

### Tasks to Complete This Week:
| Day | Tasks                                                                                                                                                                          | Start Date   | End Date        | Reference |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | --------------- | --------- |
| 2   | - Write logic for matchmaking two players and initializing the match state <br>                                                                                                  | 13/07/2026   | 13/07/2026      |           |
| 3   | - Develop the Lambda Save Deck function <br>                                                                                                                                     | 14/07/2026   | 14/07/2026      |           |
| 4   | - Build the in-turn action processing flow <br>                                                                                                                                  | 15/07/2026   | 15/07/2026      |           |
| 5   | - Develop Process Game Engine: Build the complete combat mechanics including: Attack, Counter-attack, and Skill effect activation... <br>                                         | 16/07/2026   | 16/07/2026      |           |
| 6   | - Package business logic into a single Lambda function to control Miss Timing and prevent data overwriting when updating state to DynamoDB.                                      | 17/07/2026   | 17/07/2026      |           |


### Week 11 Results Achieved:

* Successfully programmed and deployed Lambda Start Match, capable of handling matchmaking, initializing starting parameters, and recording state to DynamoDB.  

* Completed the Lambda Save Deck function, enabling players to save and update their deck structure before entering a match.  

* Merged all match business logic into a single Lambda function acting as the central Game Engine, resolving the data overwriting issue and successfully calling the API Gateway to broadcast board state to players via WebSocket.
