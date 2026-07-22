---
title: "Triển khai hệ thống"
date: 2024-01-01
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

Trong phần này, bạn sẽ triển khai ứng dụng frontend bằng **AWS Amplify Hosting**. Mã nguồn của ứng dụng được lưu trữ trên GitHub và AWS Amplify sẽ tự động build cũng như triển khai ứng dụng mỗi khi có thay đổi được đẩy lên nhánh đã chọn.

---

## Deploy 1 - Tạo ứng dụng Amplify mới

1. Mở **AWS Amplify Console**.
2. Chọn **Host web app**.
3. Chọn **GitHub** làm nhà cung cấp mã nguồn.
4. Nhấn **Next**.

> AWS Amplify hỗ trợ nhiều nền tảng quản lý mã nguồn như GitHub, GitLab, Bitbucket và AWS CodeCommit. Trong workshop này, GitHub được sử dụng để triển khai ứng dụng.

![Deploy 1](/images/5-Workshop/5.6-Deploy/deploy1.jpg)

---

## Deploy 2 - Kết nối với kho mã nguồn GitHub

1. Đăng nhập vào tài khoản **GitHub** nếu được yêu cầu.
2. Chọn repository chứa mã nguồn của dự án.
3. Chọn nhánh cần triển khai (ví dụ: **dev**).
4. Nhấn **Next**.

> AWS Amplify sẽ theo dõi nhánh đã chọn và tự động triển khai lại ứng dụng mỗi khi có thay đổi được đẩy lên GitHub.

![Deploy 2](/images/5-Workshop/5.6-Deploy/deploy2.jpg)

---

## Deploy 3 - Cấu hình Build

Thực hiện cấu hình các thông số của ứng dụng trước khi triển khai.

1. Nhập tên ứng dụng.
2. Kiểm tra các thiết lập build được AWS Amplify tự động nhận diện.
3. Xác nhận các giá trị sau:

| Thiết lập      | Giá trị           |
| -------------- | ----------------- |
| Lệnh Build     | `npm run build`   |
| Thư mục đầu ra | `Front-end/.next` |

4. Giữ nguyên các thiết lập còn lại.
5. Chọn **Next** để tiếp tục.

> AWS Amplify có thể tự động nhận diện framework của dự án. Vì dự án sử dụng **Next.js**, hầu hết các cấu hình build đều được tạo tự động và chỉ cần kiểm tra lại trước khi triển khai.

![Deploy 3](/images/5-Workshop/5.6-Deploy/deploy3.jpg)

---

## Deploy 4 - Kiểm tra Build Specification

Mở mục **Build settings** và kiểm tra nội dung của tệp **amplify.yml** được AWS Amplify tạo tự động.

Đảm bảo tệp cấu hình thực hiện các bước:

- Cài đặt các package cần thiết.
- Build ứng dụng.
- Xuất các tệp cần thiết để triển khai.

Sau khi kiểm tra hoàn tất, lưu lại cấu hình nếu có thay đổi.

> Tệp **amplify.yml** quy định toàn bộ quy trình build và triển khai ứng dụng trên AWS Amplify.

![Deploy 4](/images/5-Workshop/5.6-Deploy/deploy4.jpg)

---

## Deploy 5 - Cấu hình biến môi trường

Trước khi triển khai ứng dụng, cần cấu hình các **Environment Variables**.

Truy cập:

**Hosting → Environment variables**

Sau đó thêm các biến môi trường cần thiết.

| Biến môi trường                 | Mô tả                          |
| ------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL`           | Địa chỉ API Gateway            |
| `NEXT_PUBLIC_MATCHMAKING_ROUTE` | Endpoint của dịch vụ ghép trận |
| `NEXT_PUBLIC_WS_URL`            | Địa chỉ WebSocket              |

Sau khi hoàn tất:

1. Lưu các biến môi trường.
2. Bắt đầu quá trình triển khai.
3. Chờ đến khi trạng thái chuyển sang **Available**.
4. Mở đường dẫn do AWS Amplify cung cấp để kiểm tra ứng dụng.

> Các biến môi trường giúp frontend kết nối với các dịch vụ backend mà không cần ghi cứng địa chỉ endpoint trong mã nguồn.

![Deploy 5](/images/5-Workshop/5.6-Deploy/deploy5.jpg)

---

## Deploy 6 - Kiểm tra trạng thái triển khai

Sau khi bắt đầu quá trình triển khai, AWS Amplify sẽ tự động thực hiện các bước **Build** và **Deploy** của ứng dụng.

Tại trang **Deployments**, bạn có thể theo dõi toàn bộ quá trình triển khai.

Kiểm tra các thông tin sau:

- Trạng thái của phiên bản triển khai là **Deployed**.
- Quá trình **Build** và **Deploy** hoàn thành thành công.
- Kiểm tra thời gian build của ứng dụng.
- Xác nhận repository và nhánh đang được sử dụng.
- Sao chép **Domain** do AWS Amplify cung cấp để truy cập ứng dụng.

Nếu trạng thái hiển thị **Deployed**, điều đó cho thấy ứng dụng đã được triển khai thành công và sẵn sàng phục vụ người dùng.

Ngoài ra, mỗi lần có thay đổi được đẩy lên GitHub, AWS Amplify sẽ tự động tạo một phiên bản triển khai mới. Toàn bộ lịch sử triển khai sẽ được lưu trong mục **Deployment history**, giúp dễ dàng theo dõi các phiên bản, xem nhật ký build và thực hiện triển khai lại khi cần.

![Deploy 6](/images/5-Workshop/5.6-Deploy/deploy6.jpg)

---

## Kết quả

Xin chúc mừng!

Bạn đã triển khai thành công ứng dụng bằng **AWS Amplify Hosting**.

Sau khi triển khai hoàn tất, AWS Amplify sẽ cung cấp một **Domain** để truy cập ứng dụng trực tiếp trên Internet.

Đồng thời, ứng dụng đã được liên kết với **GitHub Repository**. Mỗi khi có thay đổi được đẩy lên nhánh đã cấu hình, AWS Amplify sẽ tự động:

- Phát hiện commit mới.
- Thực hiện Build ứng dụng.
- Triển khai phiên bản mới.
- Cập nhật lịch sử triển khai.

Cơ chế này giúp hình thành quy trình **Continuous Deployment (CD)**, cho phép việc cập nhật ứng dụng diễn ra hoàn toàn tự động mà không cần triển khai thủ công.

Đến đây, toàn bộ hệ thống gồm **Frontend (AWS Amplify Hosting)**, **Backend (AWS Lambda)**, **Amazon API Gateway**, **Amazon Cognito**, **Amazon DynamoDB** và các dịch vụ AWS liên quan đã được triển khai thành công và sẵn sàng phục vụ người dùng.
