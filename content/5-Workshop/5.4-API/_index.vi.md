---
title: "Thiết lập API Gateway và WebSocket"
date: 2024-01-01
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

Trong phần này, bạn sẽ cấu hình **Amazon API Gateway** để công khai các dịch vụ backend của ứng dụng. API Gateway đóng vai trò là điểm tiếp nhận các yêu cầu từ phía frontend và chuyển tiếp chúng đến các hàm AWS Lambda, giúp hệ thống hoạt động theo mô hình serverless một cách an toàn và có khả năng mở rộng.

Bạn cũng sẽ cấu hình API để có thể giao tiếp với ứng dụng frontend được triển khai trên AWS Amplify. Việc thiết lập Route, tích hợp Lambda, tạo Stage và cấu hình CORS sẽ đảm bảo các yêu cầu từ người dùng được xử lý chính xác.

Sau khi hoàn thành phần này, hệ thống sẽ có một **HTTP API** hoàn chỉnh, sẵn sàng kết nối giữa frontend và backend.

## Mục tiêu

- Hiểu vai trò của Amazon API Gateway trong kiến trúc hệ thống.
- Nắm được các khái niệm cơ bản của HTTP API.
- Cấu hình Route và tích hợp với AWS Lambda.
- Cấu hình CORS để frontend có thể truy cập API.
- Triển khai API và kiểm tra kết quả.

## Nội dung

1. **Giới thiệu** – Tìm hiểu về Amazon API Gateway và vai trò của dịch vụ trong kiến trúc của dự án.

2. **Thiết lập API Gateway và WebSocket** – Tạo và cấu hình HTTP API, tích hợp với AWS Lambda, cấu hình CORS, tạo Stage và triển khai API.
