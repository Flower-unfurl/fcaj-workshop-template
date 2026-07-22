---
title : "Initialize and Configure DynamoDB"
date : 2024-01-01
weight : 3
chapter : false
pre : " <b> 5.3. </b> "
---

### Create Amazon DynamoDB Database
The system uses 5 DynamoDB tables to handle both high-throughput real-time data storage and long-term persistent data.

**1. UserProfile Table:** This table encompasses the UserProfile entity, Deck, and MatchHistory summaries.
- **Partition Key (PK):** user_id (String)
```export interface PlayerState {
  user_id: string;
  nexus_hp: number;
  mana: number;
  deck_remaining: string[];
  hand: string[];
  battlefield: BattlefieldCard[];
  grave: string[];
}
```

![overview](/images/5-Workshop/5.3-S3-vpc/user.png)

**2. GameState Table:** This table operates under continuous high-frequency read/write load. It holds the LIFO array that powers the "Miss Timing" mechanism.
- **Partition Key (PK):** match_id (String)
```export interface GameState {
  match_id: string;
  status: "WAITING" | "IN_PROGRESS" | "FINISHED";
  current_round: number;
  turn_player_id?: string;
  player_1: PlayerState;
  player_2: PlayerState;
  action_stack: GameAction[];
  expire_at?: number;
}
```
![overview](/images/5-Workshop/5.3-S3-vpc/GameState.png)

**3. GameLogs Table:** This table serves the Lambda Post Match Worker function, recording every move for analytics, anti-cheat, or replay functionality.
- **Partition Key (PK):** match_id (String)
- **Sort Key (SK):** action_sequence (Number)
```export interface GameLog {
  match_id: string;
  action_sequence: number;
  actor_id: string;
  action_type: string;
  details?: Record<string, unknown>;
  timestamp: number;
}
```
![overview](/images/5-Workshop/5.3-S3-vpc/GameLogs.png)

**4. Connections Table:** To enable the system to "broadcast" the board state to the correct screens of both players in a match, each player's Connection ID is stored in a dedicated table.
- **Partition Key (PK):** connection_id (String)

```export interface Connection {
  connection_id: string;
  user_id?: string;
  match_id?: string;
  connected_at: number;
}
```
![overview](/images/5-Workshop/5.3-S3-vpc/Connections.png)

**5. MatchHistory Table:** Stores activity history.
- **Partition Key (PK):** connection_id (String)
- **Sort Key (SK):** played_at (Number)
```export interface MatchHistory {
  user_id: string;
  played_at: number; // Sort Key (timestamp)
  match_id: string;
  opponent_id: string;
  result: "WIN" | "LOSS" | "DRAW";
  rank_point_change: number;
  elo_change?: number; // Alias for rank_point_change
  duration?: number;   // Match duration in seconds
}
```

![overview](/images/5-Workshop/5.3-S3-vpc/History.png)