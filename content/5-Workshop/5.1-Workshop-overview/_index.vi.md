---
title : "Giới thiệu tổng quan & Kiến trúc dự án "
date : 2024-01-01 
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

#### Giới thiệu về AWS Serverless Architecture
Serverless (Kiến trúc không máy chủ) là một mô hình thực thi điện toán đám mây cho phép bạn xây dựng và chạy các ứng dụng mà không cần phải quản lý, vận hành hay bảo trì hệ thống máy chủ vật lý hoặc máy chủ ảo.
+ Rút ngắn thời gian đưa sản phẩm ra thị trường: Đội ngũ phát triển có thể nhanh chóng hiện thực hóa ý tưởng và phát hành tính năng mới mà không bị rào cản bởi công đoạn hạ tầng.

+ Tối ưu hóa chi phí: Tối đa hóa hiệu quả sử dụng ngân sách nhờ loại bỏ hoàn toàn chi phí duy trì tài nguyên.

+ Độ tin cậy và bảo mật cao: Dễ dàng áp dụng các tiêu chuẩn bảo mật khắt khe của AWS cùng các cơ chế phân quyền hạt mịn (fine-grained IAM policies).

#### Tổng quan về workshop

Dưới đây là danh sách các dịch vụ AWS được sử dụng để xây dựng kiến trúc cho game và vai trò cụ thể của từng dịch vụ:

| Dịch vụ AWS | Thành phần trong game | Nhiệm vụ chính |
| :--- | :--- | :--- |
| **AWS Amplify Hosting** | Frontend Distribution | Lưu trữ & phân phối Web App React/TypeScript, CI/CD tự động. |
| **Amazon Cognito** | Player Auth | Quản lý tài khoản, Đăng ký/Đăng nhập, cấp Token JWT. |
| **API Gateway WebSocket** | Real-time Gateway | Duy trì kết nối hai chiều thời gian thực giữa Web và Server. |
| **AWS Lambda** | Game Logic Engine | Xử lý logic trận đấu, kiểm tra Mana, bốc bài, tính toán sát thương. |
| **Amazon DynamoDB** | NoSQL Database | Lưu GameState (TTL), User Profile, Match History, Connections. |
| **Amazon SQS** | Message Queue | Đệm kết quả trận đấu để cập nhật Rank/EXP bất đồng bộ. |
