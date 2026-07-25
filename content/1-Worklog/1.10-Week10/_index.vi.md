---
title: "Worklog Tuần 10"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.10. </b> "
---


### Mục tiêu tuần 10:

* Khởi tạo dự án Chrono Genesis Game (Web game đối kháng turn-base trading cards game).  
* Hoàn thiện thiết kế kiến trúc Serverless Real-time Architecture trên nền tảng AWS và triển khai các lớp nền tảng (Edge, Auth, Data, Security)

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Lên ý tưởng và vẽ sơ đồ kiến trúc Serverless Real-time cho Chrono Genesis Game <br>                                                                                             | 06/07/2026   | 06/07/2026      |
| 3   | - Cấu hình Amazon Route 53 để quản lý tên miền và định tuyến người chơi truy cập vào hệ thống <br> - Tích hợp AWS WAF để lọc các request độc hại và bảo vệ hệ thống. <br> - Thiết lập AWS Amplify Hosting để lưu trữ tài nguyên tĩnh, tự động hóa CI/CD và phân phối giao diện React/TypeScript toàn cầu. <br>                 | 07/07/2026   | 07/07/2026      
| 4   | - Cấu hình Amazon Cognito để quản lý tài khoản người chơi, xử lý đăng nhập và phát hành JWT Token. <br> - Khởi tạo Amazon API Gateway (WebSocket API) kết hợp Lambda Authorizer. | 08/07/2026   | 08/07/2026     
| 5   | - Cấu hình 5 bảng chuyên biệt trên Amazon DynamoDB. <br>                  | 09/07/2026   | 10/07/2026      
| 6   | - Sử dụng AWS IAM để thiết lập quyền truy cập giữa các dịch vụ và dùng AWS KMS để mã hóa dữ liệu lưu trên DynamoDB. <br> - Tích hợp AWS X-Ray để theo dõi toàn bộ luồng xử lý request giữa API Gateway và Lambda.                                                                                         | 10/07/2026   | 10/07/2026      


### Kết quả đạt được tuần 10:

* Hoàn thiện sơ đồ thiết kế tổng quan và phân lớp kiến trúc Serverless Real-time Architecture cho dự án Web game đối kháng (turn-base trading cards game) trên AWS.  

* Triển khai thành công lớp phân phối nội dung (Edge Layer) với Amazon Route 53, AWS WAF và AWS Amplify Hosting, đảm bảo phân phối giao diện React/TypeScript và tài nguyên tĩnh toàn cầu một cách tự động và an toàn.  

* Thiết lập hệ thống định danh người dùng bằng Amazon Cognito và cấu hình thành công Amazon API Gateway (WebSocket API) để duy trì kết nối thời gian thực bằng Connection ID.  

* Khởi tạo thành công lớp lưu trữ dữ liệu trung tâm bằng Amazon DynamoDB với 5 bảng chuyên biệt đáp ứng yêu cầu đọc/ghi dữ liệu.
  
* Tích hợp thành công các dịch vụ bảo mật (IAM, KMS) để quản lý quyền và mã hóa dữ liệu, đồng thời thiết lập nền tảng giám sát với CloudWatch và X-Ray. 


