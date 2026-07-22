---
title: "Giới thiệu"
date: 2024-01-01
weight: 2
chapter: false
pre: "<b> 5.4.1 </b>"
---

#### Amazon API Gateway

- **Amazon API Gateway** là một dịch vụ được quản lý hoàn toàn (fully managed) của AWS, cho phép nhà phát triển tạo, xuất bản, quản lý, giám sát và bảo mật các API ở mọi quy mô.
- Dịch vụ này đóng vai trò là điểm tiếp nhận các yêu cầu từ ứng dụng khách (client), cho phép giao tiếp với các dịch vụ phía sau như **AWS Lambda**, **Amazon EC2** hoặc các HTTP endpoint khác.
- API Gateway hỗ trợ các tính năng như xác thực (Authentication), phân quyền (Authorization), quản lý lưu lượng truy cập (Traffic Management), giám sát (Monitoring) và quản lý phiên bản API (API Versioning), giúp việc xây dựng các ứng dụng serverless trở nên dễ dàng và an toàn hơn.

#### Tổng quan Workshop

Trong workshop này, bạn sẽ tạo một **HTTP API** bằng **Amazon API Gateway**.

Workshop bao gồm các nội dung sau:

- Cấu hình một HTTP API mới.
- Tạo các Route để xử lý yêu cầu từ client.
- Tích hợp các hàm AWS Lambda làm backend.
- Tạo một Deployment Stage.
- Triển khai (Deploy) API.
- Kiểm tra và xác nhận API đã được tạo thành công và sẵn sàng sử dụng.

Sau khi hoàn thành workshop, bạn sẽ có một **HTTP API** hoạt động hoàn chỉnh, có khả năng tiếp nhận yêu cầu từ client và gọi các hàm **AWS Lambda** thông qua **Amazon API Gateway**.
