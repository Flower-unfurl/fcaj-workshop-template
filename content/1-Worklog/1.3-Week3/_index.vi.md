---
title: "Worklog Tuần 3"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 1.3. </b> "
---


### Mục tiêu tuần 3:

* Nắm bắt chiến lược dịch chuyển đám mây liền mạch, biết cách đánh giá workload và lập kế hoạch dịch chuyển.
* Phát triển chuyên môn về dịch chuyển máy chủ ảo và ứng dụng từ môi trường ảo hóa on-premises sang Amazon EC2.
* Hiểu và thực hiện dịch chuyển cơ sở dữ liệu với thời gian ngừng tối thiểu (minimal downtime) bằng AWS DMS và công cụ SCT.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Tìm hiểu chiến lược dịch chuyển máy chủ và ứng dụng <br> - Chuẩn bị máy ảo: Cài đặt sẵn AWS CLI và một môi trường ảo hóa VMware Workstation trên máy tính cục bộ <br>                                            | 18/05/2026   | 18/05/2026      | <https://cloudjourney.awsstudygroup.com/vi/2-migrate/> |
| 3   | - Thực hành dịch vụ AWS VM Import/Export <br>&emsp; + Import máy ảo vào AWS <br>&emsp; + Export EC2 Instance từ AWS <br> - Tìm hiểu dịch vụ lưu trữ đối tượng Amazon S3 <br>                                          | 19/05/2026   | 19/05/2026      | <https://cloudjourney.awsstudygroup.com/vi/2-migrate/> |
| 4   | - Thực hành dịch chuyển cơ sở dữ liệu <br> - Thực hiện chuyển đổi lược đồ với AWS Schema Conversion Tool (SCT) <br> | 20/05/2026   | 20/05/2026      | <https://cloudjourney.awsstudygroup.com/vi/2-migrate/> |
| 5   | - Thực hành di dời dữ liệu với AWS Database Migration Service (DMS) <br> - Tìm hiểu Serverless replication   <br>                  | 21/05/2026   | 21/05/2026      | <https://cloudjourney.awsstudygroup.com/vi/2-migrate/> |
| 6   | - Tối ưu hóa và xác thực sau dịch chuyển <br> - Xử lý sự cố với AWS DMS và giảm thiểu rủi ro (quy trình rollback)                                                                                         | 22/05/2026   | 22/05/2026      | <https://cloudjourney.awsstudygroup.com/vi/2-migrate/> |


### Kết quả đạt được tuần 3:

* Nắm vững các bước lập kế hoạch, đánh giá workload và thiết lập kết nối mạng trong các giai đoạn dịch chuyển.

* Có khả năng sao lưu máy ảo vào EC2 hoặc tạo một kho lưu trữ các máy ảo để dự phòng và phục hồi sau sự cố thông qua VM Import/Export mà không bị thu phí dịch vụ.

* Sử dụng thành thạo AWS SCT để tự động chuyển đổi phần lớn các đối tượng mã cơ sở dữ liệu không đồng nhất sang định dạng tương thích với cơ sở dữ liệu đích.

* Thực hiện thành công việc di dời dữ liệu một cách dễ dàng và an toàn bằng AWS DMS, duy trì cơ sở dữ liệu nguồn hoạt động đầy đủ trong quá trình di chuyển để giảm thiểu thời gian chết (downtime)


