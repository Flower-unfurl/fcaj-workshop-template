---
title: "Các bước chuẩn bị & Amazon Cognito"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 5.2. </b> "
---

## Mục tiêu

Trước khi triển khai hệ thống, bạn cần chuẩn bị các tài nguyên AWS cần thiết và cấu hình dịch vụ xác thực người dùng. Trong phần này, bạn sẽ thiết lập các IAM Role và quyền truy cập cần thiết cho các dịch vụ AWS, đồng thời tạo **Amazon Cognito User Pool** để quản lý chức năng đăng ký và đăng nhập của người dùng.

Các cấu hình này là nền tảng để triển khai backend và frontend ở các bước tiếp theo.

### Tại sao cần hoàn thành phần này trước?

- **Phân quyền AWS:** Thiết lập các IAM Role và Policy cần thiết để các dịch vụ như AWS Lambda và Amazon SQS có thể giao tiếp với nhau một cách an toàn.
- **Xác thực người dùng:** Tạo **Amazon Cognito User Pool** để quản lý người dùng. Các thông tin như **User Pool ID**, **Client ID** và **Client Secret** sẽ được sử dụng khi cấu hình backend của ứng dụng.
- **Chuẩn bị triển khai:** Hoàn thành các bước chuẩn bị giúp đảm bảo tất cả tài nguyên AWS đã sẵn sàng trước khi bắt đầu triển khai hệ thống.

## Nội dung

1. [Cấu hình IAM](5.2.1-iam/)
2. [Cấu hình Amazon Cognito](5.2.2-cognito/)
