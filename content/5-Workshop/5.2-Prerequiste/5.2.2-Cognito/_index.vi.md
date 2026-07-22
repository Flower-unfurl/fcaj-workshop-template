---
title: "Cấu hình Amazon Cognito"
date: 2024-01-01
weight: 3
chapter: false
pre: " <b> 5.2.2 </b> "
---

Trong phần này, bạn sẽ tạo một **Amazon Cognito User Pool** để quản lý người dùng của ứng dụng. Sau khi tạo thành công, bạn sẽ lấy các thông tin cần thiết (**User Pool ID**, **Client ID** và **Client Secret**) để cấu hình cho backend.

---

## Bước 1 - Tạo User Pool

1. Mở **Amazon Cognito Console**.
2. Chọn **Create user pool**.
3. Chọn **Traditional web application**.
4. Nhập tên cho ứng dụng.

> Trong workshop này, **Amazon Cognito User Pool** được sử dụng để quản lý chức năng đăng ký và đăng nhập của người dùng.

![Create User Pool](/images/5-Workshop/5.2-Prerequisite/cognito1.png)

---

## Bước 2 - Cấu hình phương thức đăng nhập

Thiết lập các tùy chọn xác thực.

1. Chọn **Email** làm phương thức đăng nhập.
2. Bật **Self-registration** để cho phép người dùng tự đăng ký.
3. Chọn **Email** là thuộc tính bắt buộc.

> Với cấu hình này, người dùng có thể đăng ký và đăng nhập bằng địa chỉ email.

![Configure Authentication](/images/5-Workshop/5.2-Prerequisite/cognito2.png)

---

## Bước 3 - Cấu hình Callback URL

Nhập địa chỉ Callback URL của ứng dụng.

1. Nhập **Return URL** của frontend.
2. Kiểm tra lại cấu hình.
3. Nhấn **Create user directory**.

> Sau khi người dùng đăng nhập thành công, Amazon Cognito sẽ chuyển hướng về địa chỉ Callback URL này.

![Callback URL](/images/5-Workshop/5.2-Prerequisite/cognito3.png)

---

## Bước 4 - Kiểm tra User Pool

Sau vài giây, Amazon Cognito sẽ tạo thành công User Pool.

Kiểm tra User Pool vừa tạo xuất hiện trong danh sách **User pools**.

![User Pool Created](/images/5-Workshop/5.2-Prerequisite/cognito4.png)

---

## Bước 5 - Lấy User Pool ID

Mở User Pool vừa tạo.

Trong trang **Overview**, sao chép giá trị **User Pool ID**.

Giá trị này sẽ được sử dụng khi cấu hình backend.

![User Pool ID](/images/5-Workshop/5.2-Prerequisite/cognito5.png)

---

## Bước 6 - Lấy Client ID và Client Secret

Truy cập:

**Applications → App clients**

Chọn App Client đã tạo.

Sao chép các giá trị sau:

- **Client ID**
- **Client Secret**

Đây là các thông tin cần thiết để backend giao tiếp với Amazon Cognito.

![App Client Information](/images/5-Workshop/5.2-Prerequisite/cognito6.png)

---

## Kết quả

Xin chúc mừng!

Bạn đã tạo thành công **Amazon Cognito User Pool**.

Các thông tin sau đã sẵn sàng để cấu hình cho ứng dụng:

- User Pool ID
- Client ID
- Client Secret

Ở các phần tiếp theo, những giá trị này sẽ được sử dụng để tích hợp chức năng xác thực người dùng vào ứng dụng.
