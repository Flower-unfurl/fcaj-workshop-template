---
title : "Giới thiệu tổng quan & Kiến trúc dự án "
date : 2024-01-01 
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

## Giới thiệu về AWS Serverless Architecture
Serverless (Kiến trúc không máy chủ) là một mô hình thực thi điện toán đám mây cho phép bạn xây dựng và chạy các ứng dụng mà không cần phải quản lý, vận hành hay bảo trì hệ thống máy chủ vật lý hoặc máy chủ ảo.
+ Rút ngắn thời gian đưa sản phẩm ra thị trường: Đội ngũ phát triển có thể nhanh chóng hiện thực hóa ý tưởng và phát hành tính năng mới mà không bị rào cản bởi công đoạn hạ tầng.

+ Tối ưu hóa chi phí: Tối đa hóa hiệu quả sử dụng ngân sách nhờ loại bỏ hoàn toàn chi phí duy trì tài nguyên.

+ Độ tin cậy và bảo mật cao: Dễ dàng áp dụng các tiêu chuẩn bảo mật khắt khe của AWS cùng các cơ chế phân quyền hạt mịn (fine-grained IAM policies).

## Tổng quan về workshop

Dưới đây là danh sách các dịch vụ AWS được sử dụng để xây dựng kiến trúc cho game và vai trò cụ thể của từng dịch vụ:

| Dịch vụ AWS | Thành phần trong game | Nhiệm vụ chính |
| :--- | :--- | :--- |
| **AWS Amplify** | Frontend Distribution | Lưu trữ (hosting) và phân phối giao diện web game (Frontend). |
| **Amazon Route 53** | DNS & Routing | Dịch vụ DNS quản lý tên miền, định tuyến lưu lượng người chơi (Players) truy cập vào ứng dụng. |
| **Amazon Cognito** | Player Auth | Quản lý định danh, xác thực người chơi và cấp phát, kiểm chứng JWT Token (JWT Verification). |
| **Amazon API Gateway** | HTTP & WebSocket API | **HTTP API:** Tiếp nhận và xử lý các yêu cầu RESTful từ client.<br><br>**WebSocket API:** Quản lý kết nối thời gian thực hai chiều (real-time) liên tục giữa người chơi và máy chủ game. |
| **AWS Lambda** | Game Logic Engine | **HTTP Backend:** Xử lý quản lý Deck, Leaderboard, Rank và Match.<br><br>**WebSocket Handlers:** Xử lý vòng đời kết nối và logic trận đấu (Connect/Disconnect, Start/Process/Cancel/End Match).<br><br>**Workers & Tasks:** Xử lý Timeout, Post Match và tính toán lại bảng xếp hạng. |
| **Amazon EventBridge** | Scheduled Task | Bộ định thời gian tự động kích hoạt hàm Lambda Rebuild Leaderboard-Rank định kỳ mỗi 10 phút. |
| **Amazon SQS** | Message Queue | **Delayed SQS:** Nằm giữa Process Game Engine và Handle Timeout để quản lý các sự kiện có độ trễ/đếm ngược.<br><br>**SQS Chuẩn:** Nhận dữ liệu từ End Match và đẩy sang Post Match Worker xử lý, giúp giảm tải. |
| **Amazon DynamoDB** | NoSQL Database | Cơ sở dữ liệu NoSQL tốc độ cao, lưu trữ toàn bộ dữ liệu hệ thống: UserProfile, MatchHistory, GameState, GameLogs, và Connections. |
| **Security & Monitoring** | Security & Observability | **IAM:** Kiểm soát truy cập và phân quyền.<br><br>**KMS & Secrets:** Quản lý khóa mã hóa và dữ liệu nhạy cảm.<br><br>**CloudWatch & X-Ray:** Lưu trữ logs, giám sát hiệu năng và truy vết (tracing) gỡ lỗi. |
