---
title: "Các bước chuẩn bị"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 5.2.1 </b> "
---

Trước khi bắt đầu bài thực hành, bạn cần chuẩn bị các tài nguyên AWS và các quyền truy cập cần thiết để triển khai hệ thống.

## IAM Role cho AWS Lambda

Tạo IAM Role cho Lambda và gán các quyền cần thiết để Lambda có thể truy cập các dịch vụ AWS như Amazon DynamoDB, Amazon Cognito, Amazon CloudWatch Logs, Amazon SQS và các dịch vụ khác được sử dụng trong hệ thống.

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21022537.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21022934.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21023113.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/iam_for_lamda1.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/iam_for_lamda2.png)

![lambda-role](/images/5-Workshop/5.2-Prerequisite/Screenshot2026-07-21023131.png)

---

## IAM Role cho Amazon SQS

Tạo IAM Role cho phép AWS Lambda gửi và nhận message từ Amazon SQS.

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs.png)

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs3.png)

![sqs](/images/5-Workshop/5.2-Prerequisite/sqs2.png)

---

## Gán quyền truy cập SQS cho Lambda

Thêm **Amazon SQS Policy** vào IAM Role của Lambda để Lambda có thể đọc và ghi message từ hàng đợi.

![sqs](/images/5-Workshop/5.2-Prerequisite/addsqspolicyforlambda.png)

---

## Amazon Cognito

Trước khi triển khai ứng dụng, cần tạo một **Amazon Cognito User Pool** để quản lý chức năng xác thực người dùng.

Trong phần tiếp theo (**5.3 Configure Amazon Cognito**), bạn sẽ:

- Tạo User Pool.
- Cấu hình phương thức đăng nhập bằng Email.
- Tạo App Client.
- Lấy **User Pool ID**.
- Lấy **Client ID**.
- Lấy **Client Secret**.

Các thông tin này sẽ được sử dụng để cấu hình backend của ứng dụng.
