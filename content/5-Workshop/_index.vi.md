---
title: "Workshop"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---


# XÂY DỰNG WEB GAME TRÊN AWS VỚI SERVERLESS ARCHITECTURE

#### Tổng quan

**AWS Serverless Architecture** cung cấp khả năng tự động mở rộng linh hoạt và tối ưu chi phí cho các ứng dụng có lưu lượng truy cập thay đổi liên tục, đặc biệt là các trò chơi trực tuyến thời gian thực.

Trong bài lab này, chúng ta sẽ học cách thiết kế, cấu hình và triển khai dự án Chrono Genesis Game – áp dụng hoàn toàn kiến trúc Serverless Real-time Architecture trên nền tảng AWS. 

Chúng ta sẽ sử dụng và kết hợp các dịch vụ cốt lõi của AWS để tạo nên một hệ thống game đồng bộ hai chiều hoàn chỉnh:

+ **API Gateway (WebSocket API) & Amazon Cognito:** Duy trì kết nối thời gian thực giữa người chơi và hệ thống sau khi xác thực người dùng thành công bằng JWT Token.

+ **AWS Lambda & Amazon SQS:** Lambda xử lý toàn bộ logic, SQS xử lý bất đồng bộ các tác vụ cập nhật Rank, EXP và lịch sử trận đấu.

+ **Amazon DynamoDB:** Trung tâm dữ liệu toàn diện lưu trữ trạng thái trận đấu thời gian thực và lưu trữ thông tin người chơi lâu dài.

+ **AWS Amplify Hosting** Phân phối toàn cầu giao diện Web (React/TypeScript) và tự động hóa quy trình CI/CD.

#### Nội dung

1. [Tổng quan về workshop](5.1-Workshop-overview/)
2. [Các bước chuẩn bị](5.2-Prerequiste/)
3. [Tạo Cơ sở dữ liệu Amazon DynamoDB](5.3-S3-vpc/)
4. [Thiết lập Authentication & API Gateway WebSocket](5.4-S3-onprem/)
5. [Cấu hình Business Logic Compute (AWS Lambda Functions & SQS)](5.5-Policy/)
6. [Deploy Frontend Web Game với AWS Amplify Hosting](5.6-Deploy/)
7. [Dọn dẹp tài nguyên](5.7-Cleanup/)
