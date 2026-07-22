---
title: "Thiết lập cổng API và Websocket"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 5.4.2 </b> "
---

#### Tổng quan

Trong phần này, bạn sẽ tạo một **HTTP API** bằng **Amazon API Gateway**. API sẽ đóng vai trò là điểm tiếp nhận các yêu cầu từ phía client và chuyển tiếp chúng đến các hàm AWS Lambda. Bạn sẽ lần lượt cấu hình API, tạo Route, tích hợp Lambda, tạo Stage và triển khai API.

---

## Bước 1. Cấu hình Socket API Gateway

1. Truy cập **Amazon API Gateway**.
2. Chọn mục **HTTP API**
3. Nhập tên API và các thông tin cần thiết.
4. Tiếp tục sang bước tiếp theo.

HTTP API là lựa chọn phù hợp cho các ứng dụng serverless nhờ chi phí thấp, độ trễ thấp và khả năng tích hợp trực tiếp với AWS Lambda.

![Configure HTTP API](/images/5-Workshop/5.4-API/api_gateway1.png)

---

## Bước 2. Tạo Route

Route xác định cách API xử lý các yêu cầu từ phía người dùng.

1. Chọn **Add routes**.
2. Khai báo đường dẫn (Resource Path) tương ứng.

Mỗi Route sẽ đại diện cho một Endpoint mà client có thể truy cập thông qua API Gateway.

![Create Routes](/images/5-Workshop/5.4-API/api_gateway2.png)

---

## Bước 3. Tích hợp AWS Lambda

Sau khi tạo Route, tiến hành kết nối Route với AWS Lambda.

1. Chọn Interation Type là: **lambda**
2. Chọn Lambda Function sẽ xử lý yêu cầu tương ứng với route
3. Xác nhận cấu hình.

Khi client gửi request đến Route, API Gateway sẽ tự động gọi Lambda Function tương ứng để xử lý.

![Attach Lambda Integration](/images/5-Workshop/5.4-API/api_gateway3.png)

---

## Bước 4. Tạo Stage

Stage đại diện cho một phiên bản đã được triển khai của API.

1. Tạo một Stage mới.
2. Đặt tên Stage, ví dụ **dev** hoặc **production**.
3. Tiếp tục quá trình triển khai.

Việc sử dụng Stage giúp quản lý nhiều môi trường khác nhau trên cùng một API.

![Create Stage](/images/5-Workshop/5.4-API/api_gateway4.png)

---

## Bước 5. Kiểm tra cấu hình

Trước khi tạo API, hãy kiểm tra lại toàn bộ cấu hình, bao gồm Route, Lambda Integration và Stage.

Nếu mọi thông tin đều chính xác, chọn **Create**.

![Review Configuration](/images/5-Workshop/5.4-API/api_gateway5.png)

---

## Bước 6. Kiểm tra Route

Sau khi API được tạo thành công, kiểm tra danh sách các Route đã cấu hình.

Đảm bảo mỗi Route đã được liên kết đúng với Lambda Function tương ứng.

![API Routes](/images/5-Workshop/5.4-API/api_gateway6.png)

---

## Bước 7. Triển khai API

Chọn **Deploy** để xuất bản API.

Sau khi triển khai, API Gateway sẽ cung cấp một **Invoke URL** để các ứng dụng có thể gửi yêu cầu đến API.

![Deploy API](/images/5-Workshop/5.4-API/api_gateway7.png)

---

## Bước 8. Hoàn tất triển khai

Khi quá trình triển khai hoàn tất, API đã sẵn sàng để sử dụng.

Bạn có thể kiểm tra hoạt động của API bằng **Postman**, **curl** hoặc ứng dụng web.

![Deployment Completed](/images/5-Workshop/5.4-API/api_gateway8.png)

---

## Bước 9. Thiết lập HTTP API Gateway

1. Truy cập API Gateway -> HTTP API
2. Cấu hình như trong hình -> Bấm Create
3. Tương tự tạo route /ANY {+Proxy}
4. Review lại route

Bước này giúp đảm bảo các yêu cầu từ client sẽ được chuyển tiếp đến đúng Lambda Function để xử lý.

![Kiểm tra Route](/images/5-Workshop/5.4-API/api_gateway13.png)

![Kiểm tra Route](/images/5-Workshop/5.4-API/api_gateway9.png)

---

## Bước 10. Kiểm tra cấu hình Lambda Integration

Tiếp theo, chuyển sang mục **Integrations** để xem chi tiết cấu hình kết nối giữa Amazon API Gateway và AWS Lambda.

Xác nhận các thông tin sau:

- Loại Integration là **AWS Lambda**.
- Đã chọn đúng Lambda Function cần sử dụng.
- Phiên bản **Payload Format** được cấu hình chính xác.

Việc kiểm tra các thiết lập này giúp đảm bảo API Gateway có thể gọi Lambda Function thành công khi nhận được yêu cầu từ người dùng.

![Kiểm tra Lambda Integration](/images/5-Workshop/5.4-API/api_gateway10.png)

---

## Bước 11. Cấu hình CORS

Nếu ứng dụng Frontend truy cập API từ một tên miền khác, bạn cần cấu hình **Cross-Origin Resource Sharing (CORS)**.

1. Mở trang cấu hình **CORS**.
2. Khai báo các **Allowed Origins**.
3. Chọn các phương thức HTTP được phép như **GET**, **POST**, **OPTION**.
4. Thêm các header cho access control
5. Thêm URL Amilify vào Acess-control-allow-origin
6. Lưu cấu hình.

Việc bật CORS cho phép trình duyệt gửi yêu cầu từ ứng dụng Frontend đến Amazon API Gateway một cách an toàn.

![Cấu hình CORS](/images/5-Workshop/5.4-API/api_gateway11.png)

---

## Bước 12. Kiểm tra Stage đã triển khai

Cuối cùng, mở mục **Stages** để xác nhận API đã được triển khai thành công.

1. Click vào Create -> nhập tên stage -> Enable auto deployment.
2. Sau đó Edit như ô bên phải.

- Stage đã được tạo thành công.
- Phiên bản triển khai mới nhất đã được xuất bản.
- API đã sẵn sàng tiếp nhận các yêu cầu từ client.

Sau khi hoàn thành bước này, HTTP API đã sẵn sàng để tích hợp với ứng dụng và xử lý các yêu cầu từ người dùng.

![Kiểm tra Stage](/images/5-Workshop/5.4-API/api_gateway12.png)
