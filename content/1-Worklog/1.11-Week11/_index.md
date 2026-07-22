---
title: "Worklog Week 11"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.11. </b> "
---


### Week 11 Goals:

* Convert the entire Game Engine into separate Lambda functions, package dependencies (Node.js), and upload to AWS Lambda.
* Integrate KMS and Secrets Manager encryption services to secure DynamoDB connection credentials.
* Finalize the ELO score calculation feature, handle match-exit scenarios, and optimize chessboard UI graphics.

### Tasks to Be Completed This Week:
| Day | Task                                                                                                                                                                                                                                                                                              | Start Date   | End Date        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- |
| Mon | Convert the engine structure into Lambda functions. <br> Bundle code + dependencies into a single JavaScript file (Node.js build), package, and upload to AWS Lambda.                                                                                                                            | 14/07/2026   | 14/07/2026      |
| Tue | Build Lambda functions: Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match, Connect Handler, Disconnect Handler. Build, compress into a zip file, and update on AWS Lambda.                                                                                                   | 15/07/2026   | 15/07/2026      |
| Wed | Use KMS and Secrets Manager: the Secret Key borrows the database key from KMS to decrypt and returns a clean accessKey/secretAccessKey pair for Lambda to communicate with DynamoDB.                                                                                                              | 16/07/2026   | 16/07/2026      |
| Thu | Refine the connection flow, handle ELO score increases/decreases when continuing or exiting a match.                                                                                                                                                                                              | 17/07/2026   | 17/07/2026      |
| Fri | Add the hover card Tilt feature (card tilts according to mouse movement). <br> Add glowing board border and glowing nexus-panel effect for the priority turn player.                                                                                                                              | 18/07/2026   | 18/07/2026      |

### Week 11 Results Achieved:

* Packaged the Game Engine into specialized AWS Lambda functions (Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match, Connect Handler, Disconnect Handler) running on a Node.js environment.

* Successfully integrated AWS KMS and Secrets Manager: secured connection string credentials and safely decrypted the accessKey/secretAccessKey pair for Lambda to query DynamoDB without exposing sensitive information.

* Finalized the algorithm to automatically calculate and update ELO ranking scores when a player wins, loses, or exits a match midway.

* Enhanced the user interface experience: integrated a 3D card-tilt effect following the mouse cursor (Tilt card) and a glowing board area (nexus-panel) when it is the player's turn.

