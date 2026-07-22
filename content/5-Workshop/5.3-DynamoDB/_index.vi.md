---
title : "Khởi tạo và Cấu hình DynamoDB"
date : 2024-01-01 
weight : 3
chapter : false
pre : " <b> 5.3. </b> "
---

### Tạo Cơ Sở Dữ Liệu Amazon DynamoDB
Hệ thống sử dụng 5 bảng DynamoDB để đảm nhận cả nhiệm vụ lưu trữ lưu lượng cao thời gian thực lẫn dữ liệu
lâu dài.

**1. Bảng UserProfile:** Bảng này sẽ bao hàm thực thể UserProfile, Deck, và tóm tắt MatchHistory. 
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

**2. Bảng GameState:** Bảng này hoạt động với cường độ đọc/ghi liên tục. Đây là nơi chứa mảng LIFO phục vụ cơ chế "Miss Timing". 
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

**3. Bảng GameLogs:** Bảng này phục vụ cho Lambda Post Match Worker , giúp lưu lại từng nước cờ để phân tích, chống gian lận hoặc làm tính năng xem lại trận (Replay). 
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

**4. Bảng Connections:** Để hệ thống có thể "Broadcast" trạng thái bàn cờ về đúng màn hình của 2 người chơi trong trận. Các Connection ID của player sẽ được lưu trữ vào bảng riêng.
- **Partition Key (PK):** connection_id (String)

```export interface Connection {
  connection_id: string;
  user_id?: string;
  match_id?: string;
  connected_at: number;
}
```
![overview](/images/5-Workshop/5.3-S3-vpc/Connections.png)

**5. Bảng MatchHistory:** Lưu lịch sử hoạt động.
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
