---
title: "Worklog Tuần 12"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.12 </b> "
---

### Mục tiêu tuần 12:

* Thiết lập dịch vụ SQS kết hợp CloudWatch và AWS X-Ray để giám sát, ghi vết và xử lý bất đồng bộ dữ liệu trận đấu.
* Xây dựng và kiểm thử toàn bộ hệ thống API Gateway (Route $connect, $disconnect, game-action, matchfinding,...).
* Triển khai hoàn chỉnh dự án lên AWS Amplify Hosting, cấu hình luồng CI/CD tự động và hoàn thiện báo cáo thực tập.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                     | Ngày bắt đầu | Ngày hoàn thành |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- |
| 2   | Setup SQS trigger đến Lambda Post Match Worker. <br> Setup CloudWatch (logs, metrics, lỗi, độ trễ) và X-Ray theo dõi luồng request.                                          | 21/07/2026   | 21/07/2026      |
| 3   | Hoàn thiện Lambda Post Match Worker xử lý luồng dữ liệu xuống DynamoDB từ SQS. <br> Kiểm thử các Lambda function thông qua Test Event.                                       | 22/07/2026   | 22/07/2026      |
| 4   | Xây dựng API Gateway với các route ($connect, $disconnect, matchfinding-start, game-action, game-timeout, game-surrender, deck-save).                                         | 23/07/2026   | 23/07/2026      |
| 5   | Bật Lambda proxy integration cho các route = true. <br> Kiểm thử toàn bộ các route API bằng Postman.                                                                         | 24/07/2026   | 24/07/2026      |
| 6   | Triển khai dự án lên AWS Amplify Hosting, tinh chỉnh CI/CD. <br> Cải tiến giao diện người dùng mượt mà và hoàn thiện báo cáo.                                                | 25/07/2026   | 25/07/2026      |

### Kết quả đạt được tuần 12:

* Xây dựng luồng xử lý bất đồng bộ hiệu quả: Sử dụng SQS nhận dữ liệu từ Lambda End Match và chuyển cho Lambda Post Match Worker ghi dần vào DynamoDB, giải quyết triệt để bài toán nghẽn mạng hay sập server khi có nhiều trận đấu kết thúc đồng thời.

* Tích hợp CloudWatch thu thập đầy đủ logs, metrics, tỷ lệ lỗi và độ trễ của các hàm Lambda; tích hợp AWS X-Ray giúp ghi vết toàn bộ luồng request qua API Gateway và Lambda để truy vết lỗi nhanh chóng.

* Khởi tạo và cấu hình thành công các Route trên WebSocket API Gateway, bật tính năng Lambda proxy integration và kiểm thử thành công tất cả các kịch bản bằng Postman.

* Triển khai toàn bộ dự án Frontend/Backend lên dịch vụ AWS Amplify Hosting, thiết lập luồng CI/CD tự động cập nhật khi push code.

* Tối ưu hóa toàn bộ giao diện, đảm bảo hệ thống vận hành mượt mà, ổn định và hoàn thành báo cáo tổng kết thực tập.





