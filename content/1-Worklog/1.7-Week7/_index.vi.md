---
title: "Worklog Tuần 7"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 1.7. </b> "
---


### Mục tiêu tuần 7:

* Thành thạo orchestration container cấp doanh nghiệp với hệ sinh thái dịch vụ container toàn diện của AWS, từ triển khai container nhẹ đến orchestration Kubernetes phức tạp.
* Nắm vững cách thiết kế, triển khai và quản lý các ứng dụng được containerized ở quy mô lớn bằng AWS ECS, EKS và Fargate.  
* Xử lý các thách thức container thực tế bao gồm service mesh, bảo mật, giám sát và tích hợp luồng CI/CD

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Tìm hiểu và làm Lab: <br>&emsp; + Tối ưu hóa kích thước container image và quản lý registry <br>&emsp; + Cấu hình và chạy thử ứng dụng container trên nền tảng Amazon Lightsail Container <br>                                         | 15/06/2026   | 15/06/2026      | https://cloudjourney.awsstudygroup.com/vi/5-container/ |
| 3   | - Tìm hiểu và làm Lab: <br>&emsp; + Amazon ECS & Chuyển đổi Monolith to Microservices <br>&emsp; + Vận dụng Docker kết hợp với AWS Fargate để chạy và tự động scale các container theo mô hình serverless <br>&emsp; + Thiết lập chi tiết Task definitions, cấu hình services và quản lý cluster trên Amazon ECS <br>                                         | 16/06/2026   | 16/06/2026      | https://cloudjourney.awsstudygroup.com/vi/5-container/ |
| 4   | - Thực hành khởi tạo và thiết lập cụm Kubernetes tiêu chuẩn trên AWS bằng dịch vụ Amazon EKS <br> - Thực hành cấu hình mạng cho cụm, cài đặt các add-ons cần thiết và tiến hành deploy các workloads (pod, deployment, service) lên môi trường EKS <br>                                           | 17/06/2026   | 17/06/2026      | https://cloudjourney.awsstudygroup.com/vi/5-container/ |
| 5   | - Tìm hiểu và làm Lab: <br>&emsp; + Thiết lập luồng CI/CD pipeline tự động hoàn toàn bằng AWS CodePipeline <br>&emsp; + Cấu hình webhook để liên kết mã nguồn từ kho lưu trữ GitHub <br>                                            | 18/06/2026   | 18/06/2026      | https://cloudjourney.awsstudygroup.com/vi/5-container/ |
| 6   | - Tìm hiểu và làm Lab: <br>&emsp; + Cấu hình hệ thống Service Mesh để quản lý traffic và mã hóa giao tiếp giữa các microservices <br>&emsp; + Thiết lập các lớp bảo vệ runtime và kiểm tra mức độ tuân thủ bảo mật của toàn bộ hệ thống <br>                                            | 19/06/2026   | 19/06/2026      | https://cloudjourney.awsstudygroup.com/vi/5-container/ |


### Kết quả đạt được tuần 7:
* Nắm vững nền tảng vận hành Docker trên môi trường đám mây và tối ưu hóa được container image.

* Đã tự tay cấu hình và quản lý thành công các container workload trên cả Amazon ECS và Kubernetes (Amazon EKS).

* Trải nghiệm thực tế sức mạnh của AWS Fargate trong việc chạy container mà không phải bận tâm về hạ tầng máy chủ nền.

* Thiết lập thành công chu trình CI/CD mượt mà từ GitHub lên thẳng môi trường EKS bằng CodePipeline.

* Đảm bảo được tiêu chuẩn bảo mật doanh nghiệp cho container thông qua các công cụ quét lỗ hổng, bảo vệ runtime và quản lý traffic với Service Mesh.


