---
title: "Worklog Tuần 11"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.11. </b> "
---


### Mục tiêu tuần 11:

* Xây dựng và lập trình Lớp Xử Lý Nghiệp Vụ.  
* Triển khai các hàm AWS Lambda chuyên biệt để xử lý vòng đời của trận đấu, từ lúc bắt đầu, thao tác trong lượt, đến cơ chế chiến đấu.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Viết logic xử lý ghép hai người chơi và khởi tạo trạng thái trận đấu <br>                                                                                              | 13/07/2026   | 13/07/2026      |
| 3   | - Phát triển Lambda Save Deck <br>                                            | 14/07/2026   | 14/07/2026     
| 4   | - Xây dựng luồng xử lý các hành động trong lượt chơi <br>  | 15/07/2026   | 15/07/2026      
| 5   | - Phát triển Proccess Game Engine: Xây dựng toàn bộ cơ chế chiến đấu bao gồm: Tấn công, phản công và kích hoạt hiệu ứng kỹ năng...   <br>                  | 16/07/2026   | 16/07/2026      
| 6   | - Đóng gói các nghiệp vụ thành một hàm Lambda duy nhất  để kiểm soát Miss Timing và chặn chép đè dữ liệu khi cập nhật trạng thái lên DynamoDB.                                                                                        | 17/07/2026   | 17/07/2026      


### Kết quả đạt được tuần 11:

* Lập trình và triển khai thành công Lambda Start Match, có khả năng xử lý ghép trận, khởi tạo thông số ban đầu và ghi nhận trạng thái vào DynamoDB.  

* Hoàn thiện hàm Lambda Save Deck giúp người chơi lưu và cập nhật cấu trúc bộ bài trước khi tiến vào trận đấu.  

* Hợp nhất toàn bộ nghiệp vụ xử lý trận đấu vào một hàm Lambda đóng vai trò Game Engine trung tâm, giải quyết vấn đề chép đè dữ liệu và gọi thành công API Gateway để Broadcast trạng thái ván bài đến người chơi qua WebSocket.