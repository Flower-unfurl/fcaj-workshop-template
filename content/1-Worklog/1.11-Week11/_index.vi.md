---
title: "Worklog Tuần 11"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 1.11. </b> "
---


### Mục tiêu tuần 11:

* Chuyển đổi toàn bộ Game Engine thành các hàm Lambda riêng biệt, thực hiện đóng gói dependencies (Node.js) và upload lên AWS Lambda.
* Tích hợp dịch vụ mã hóa KMS và Secrets Manager để bảo mật thông tin kết nối cơ sở dữ liệu DynamoDB.
* Hoàn thiện tính năng tính toán điểm ELO, xử lý thoát trận và tối ưu hóa hiệu ứng đồ họa UI bàn cờ.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                                                                                                                         | Ngày bắt đầu | Ngày hoàn thành |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- |
| 2   | Chuyển đổi cấu trúc engine thành Lambda function. <br> Gộp code + dependency vào 1 file JavaScript (build cho Node.js), đóng gói và upload lên AWS Lambda.                                                                                                                                           | 14/07/2026   | 14/07/2026      |
| 3   | Xây dựng các Lambda function: Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match, Connect Handler, Disconnect Handler. Build, nén thành file zip và update lên AWS Lambda.                                                                                                   | 15/07/2026   | 15/07/2026      |
| 4   | Sử dụng dịch vụ KMS và Secrets Manager: Secret Key mượn khoá database từ KMS để giải mã, trả về cặp khoá accessKey và secretAccessKey sạch cho Lambda giao tiếp với DynamoDB.                                                                                                                   | 16/07/2026   | 16/07/2026      |
| 5   | Chỉnh sửa luồng kết nối, xử lý tăng/giảm điểm ELO khi tiếp tục hoặc thoát trận.                                                                                                                                                                                                                | 17/07/2026   | 17/07/2026      |
| 6   | Thêm tính năng hover card Tilt (card nghiêng theo chuột). <br> Thêm viền sàn sáng và hiệu ứng sáng nexus-panel đối với priority turn player.                                                                                                                                                    | 18/07/2026   | 18/07/2026      |

### Kết quả đạt được tuần 11:

* Đóng gói Game Engine thành các hàm AWS Lambda chuyên biệt (Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match, Connect Handler, Disconnect Handler) chạy trên môi trường Node.js.

* Tích hợp thành công AWS KMS và Secrets Manager: bảo mật thông tin chuỗi kết nối, giải mã an toàn cặp khóa accessKey/secretAccessKey để Lambda truy vấn DynamoDB mà không bị lộ thông tin nhạy cảm.

* Hoàn thiện thuật toán tự động tính toán và cập nhật điểm xếp hạng ELO khi người chơi thắng, thua hoặc thoát trận giữa chừng.

* Nâng cấp trải nghiệm người dùng trên giao diện: tích hợp hiệu ứng card nghiêng 3D theo con trỏ chuột (Tilt card) và hiệu ứng phát sáng vùng bàn cờ (nexus-panel) khi đến lượt đánh.


