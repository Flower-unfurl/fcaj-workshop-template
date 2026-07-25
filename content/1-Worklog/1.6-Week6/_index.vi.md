---
title: "Worklog Tuần 6"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 1.6. </b> "
---


### Mục tiêu tuần 6:

* Thành thạo nghệ thuật chuyển đổi các ứng dụng monolithic thành kiến trúc cloud-native hiện đại, có thể mở rộng.
* Trải nghiệm hiện đại hóa thực hành của một ứng dụng Java Spring Boot hoàn chỉnh, học cách phân tách monolith, triển khai kiến trúc hướng sự kiện và tận dụng các dịch vụ được quản lý của AWS để đạt hiệu quả và khả năng mở rộng tối đa.  
* Nắm vững kiến trúc Microservices (Phân tách dịch vụ và bounded contexts), Serverless Computing, Thiết kế API-First, và Hệ thống hướng sự kiện.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Dịch chuyển ứng dụng Monolith: Nghiên cứu tài liệu, phân tích mã nguồn và lên phương án bóc tách ứng dụng nguyên khối sang kiến trúc Cloud-Native <br> - Thực hành thiết lập luồng CI/CD cơ bản để tự động hóa quá trình đóng gói và phát hành ứng dụng <br> - Tạo Microservice <br> - Thực hành phân tích lược đồ dữ liệu <br>&emsp; + Sử dụng các công cụ như Draw.io hoặc Mermaid để trực quan hóa <br>&emsp; + Thiết kế workflow phù hợp với kiến trúc phân tán                                            | 08/06/2026   | 08/06/2026      | https://cloudjourney.awsstudygroup.com/vi/4-modernize/ |
| 3   | - Nghiên cứu cơ chế giao tiếp bất đồng bộ giữa các Microservice thông qua Event-driven <br> - Thực hành khởi tạo và tích hợp hệ thống chứng thực bảo mật cho một SPA <br> - Khám phá, trải nghiệm chạy thử nghiệm các dịch vụ Trí tuệ nhân tạo (AI) tích hợp sẵn của AWS để đánh giá khả năng áp dụng vào hệ thống <br> - Làm quen và thiết kế các luồng công việc (state machine) nhằm điều phối các quy trình nghiệp vụ phức tạp <br>                                            | 09/06/2026   | 09/06/2026      | https://cloudjourney.awsstudygroup.com/vi/4-modernize/ |
| 4   | - Tìm hiểu và làm Lab: Tương tác S3 & DynamoDB <br> - Thực hành cấu hình để Frontend gọi API thông qua dịch vụ Amazon API Gateway <br> - Tìm hiểu và sử dụng AWS Serverless Application Model (SAM) <br>                                            | 10/06/2026   | 10/06/2026      | https://cloudjourney.awsstudygroup.com/vi/4-modernize/ |
| 5   | - Tìm hiểu và làm Lab: <br>&emsp; + Hệ thống quản lý danh tính, cấp phép và xác thực người dùng bằng Amazon Cognito <br>&emsp; + Cấu hình lưu trữ một trang web tĩnh trên Amazon S3, tích hợp bảo mật SSL/TLS <br>&emsp; + Xây dựng mô hình xử lý đơn hàng bất đồng bộ bằng cách kết hợp hàng đợi Amazon SQS và dịch vụ thông báo tin nhắn Amazon SNS <br>                                            | 11/06/2026   | 11/06/2026      | https://cloudjourney.awsstudygroup.com/vi/4-modernize/ |
| 6   | - Tìm hiểu và làm Lab: <br>&emsp; + Xây dựng CI/CD pipeline cho các ứng dụng Serverless bằng AWS CodePipeline <br>&emsp; + Cấu hình hệ thống giám sát hiệu năng, ghi log và tracing cho các hàm Lambda bằng Amazon CloudWatch và AWS X-Ray <br>&emsp; + Quản lý API GraphQL với AWS AppSync, tối ưu hóa việc truy xuất dữ liệu từ nhiều nguồn <br>                                            | 12/06/2026   | 12/06/2026      | https://cloudjourney.awsstudygroup.com/vi/4-modernize/ |


### Kết quả đạt được tuần 6:
* Đã phân tách thành công ứng dụng Monolith, tạo các Microservice và cơ cấu lại dữ liệu/quy trình làm việc.

* Nắm bắt cách thiết lập Microservice Messaging và Eventing, cũng như bắt đầu ứng dụng AWS Step Functions.

* Có khả năng xây dựng ứng dụng Serverless, tích hợp Lambda với S3, DynamoDB và cấu hình Frontend gọi API qua API Gateway.

* Đã triển khai xác thực người dùng bằng Amazon Cognito, xử lý thông điệp bất đồng bộ với SQS/SNS và thiết lập pipeline CI/CD.

* Thiết lập thành công giám sát hệ thống Serverless bằng CloudWatch và X-Ray.


