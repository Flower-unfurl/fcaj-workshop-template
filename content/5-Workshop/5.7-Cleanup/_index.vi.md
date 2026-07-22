---
title: "Dọn dẹp tài nguyên"
date: 2024-01-01
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
---

## Tổng quan

Sau khi hoàn thành workshop, bạn nên xóa các tài nguyên AWS đã tạo để tránh phát sinh chi phí không cần thiết.

Trong workshop này, các dịch vụ cần được dọn dẹp bao gồm:

- Amazon Cognito
- AWS Lambda
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- AWS IAM (User, Role và Policy)

> **Lưu ý:** Chỉ xóa những tài nguyên được tạo riêng cho workshop này. Không xóa các tài nguyên đang được sử dụng bởi những dự án khác.

---

## Bước 1. Xóa AWS Lambda Functions

1. Truy cập **AWS Lambda Console**.
2. Chọn tất cả các Lambda Function của dự án.
3. Chọn **Actions → Delete**.
4. Nhập **confirm** để xác nhận việc xóa.

Sau khi hoàn tất, toàn bộ Lambda Function sẽ được xóa khỏi tài khoản AWS.

![Delete Lambda](/images/5-Workshop/5.7-Cleanup/lambda_cleanup.png)

---

## Bước 2. Xóa HTTP API và WebSocket API

1. Truy cập **Amazon API Gateway**.
2. Chọn các API đã tạo trong workshop.
3. Chọn **Delete**.
4. Xác nhận thao tác.

Việc này sẽ xóa toàn bộ Endpoint, Route và Stage của API.

![Delete API Gateway](/images/5-Workshop/5.7-Cleanup/api_cleanup1.png)
![Delete API Gateway](/images/5-Workshop/5.7-Cleanup/api_cleanup2.png)

---

## Bước 3. Xóa Amazon SQS Queue

1. Truy cập **Amazon SQS**.
2. Chọn Queue của dự án.
3. Chọn **Delete**.
4. Xác nhận tên Queue để hoàn tất.

Sau khi xóa, Queue sẽ không còn lưu trữ hoặc xử lý message.

![Delete SQS](/images/5-Workshop/5.7-Cleanup/sqs_cleanup.png)

---

## Bước 4. Xóa DynamoDB Tables

1. Mở **Amazon DynamoDB Console**.
2. Chọn các bảng dữ liệu của dự án.
3. Chọn **Delete Table**.
4. Nhập tên bảng để xác nhận.

Toàn bộ dữ liệu trong bảng sẽ bị xóa vĩnh viễn.

![Delete DynamoDB](/images/5-Workshop/5.7-Cleanup/dynamodb_cleanup.png)

---

## Bước 5. Xóa Amazon Cognito User Pool

1. Truy cập **Amazon Cognito**.
2. Chọn **User Pools**.
3. Chọn User Pool đã tạo.
4. Chọn **Delete User Pool**.
5. Xác nhận thao tác.

Sau khi xóa, toàn bộ người dùng và cấu hình xác thực sẽ bị loại bỏ.

![Delete Cognito](/images/5-Workshop/5.7-Cleanup/cognito_cleanup.png)

---

## Bước 6. Xóa IAM Resources

Cuối cùng, xóa các tài nguyên IAM đã tạo cho workshop.

Bao gồm:

- IAM User
- IAM Role
- IAM Policy

Thực hiện lần lượt:

1. Gỡ Policy khỏi User hoặc Role.
2. Xóa IAM Role.
3. Xóa IAM User.

> Không thể xóa User hoặc Role khi vẫn còn Policy hoặc Access Key được gắn.

![Delete IAM User](/images/5-Workshop/5.7-Cleanup/iam_user_cleanup.png)
![Delete IAM Role](/images/5-Workshop/5.7-Cleanup/iam_role_cleanup.png)

---

## Bước 7. Xóa AWS Secrets Manager

Nếu bạn đã sử dụng **AWS Secrets Manager** để lưu trữ các thông tin nhạy cảm (như Cognito Client Secret hoặc các khóa API), hãy thực hiện xóa các Secret sau khi hoàn thành workshop.

1. Truy cập **AWS Secrets Manager**.
2. Chọn các Secret được tạo cho dự án.
3. Chọn **Delete secret**.
4. Xác nhận thao tác xóa.

> **Lưu ý:** Chỉ xóa các Secret được tạo riêng cho workshop.

![Delete Secret](/images/5-Workshop/5.7-Cleanup/secret_cleanup.png)

---

## Bước 8. Xóa AWS KMS Key

Nếu dự án sử dụng **AWS Key Management Service (KMS)** để mã hóa dữ liệu hoặc quản lý Secret, hãy tiến hành xóa Customer Managed Key.

1. Truy cập **AWS KMS**.
2. Chọn **Customer managed keys**.
3. Chọn Key đã tạo cho workshop.
4. Chọn **Schedule key deletion**.
5. Chọn thời gian chờ (ví dụ: **7 ngày**).
6. Xác nhận thao tác.

> AWS KMS không cho phép xóa Key ngay lập tức mà sẽ lên lịch xóa sau khoảng thời gian đã chọn.

![Delete KMS](/images/5-Workshop/5.7-Cleanup/kms_cleanup.png)

---

## Bước 9. Xóa ứng dụng AWS Amplify

Sau khi hoàn thành workshop, bạn có thể xóa ứng dụng đã triển khai trên **AWS Amplify Hosting**.

1. Truy cập **AWS Amplify Console**.
2. Chọn ứng dụng đã triển khai.
3. Chọn **App settings → General settings**.
4. Kéo xuống cuối trang.
5. Chọn **Delete app**.
6. Nhập tên ứng dụng để xác nhận.

Sau khi hoàn tất:

- Website sẽ ngừng hoạt động.
- Amplify Hosting sẽ được gỡ bỏ.
- Toàn bộ lịch sử triển khai (Deployment History) sẽ bị xóa.

![Delete Amplify](/images/5-Workshop/5.7-Cleanup/amplify_cleanup.png)

---

## Hoàn tất

Xin chúc mừng!

Bạn đã hoàn thành workshop và dọn dẹp toàn bộ tài nguyên AWS đã sử dụng, bao gồm:

- Amazon Cognito
- AWS Lambda
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- AWS IAM
- AWS Secrets Manager
- AWS Key Management Service (KMS)
- AWS Amplify Hosting

Việc dọn dẹp các tài nguyên sau khi hoàn thành workshop sẽ giúp:

- Tránh phát sinh chi phí không cần thiết trên AWS.
- Giữ tài khoản AWS gọn gàng và dễ quản lý.
- Loại bỏ các tài nguyên không còn sử dụng.
- Chuẩn bị môi trường sạch cho các workshop hoặc dự án tiếp theo.
