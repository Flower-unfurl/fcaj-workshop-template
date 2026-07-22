---
title: "Blog 3"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.3. </b> "
---

# XÂY DỰNG GAME ĐA NGƯỜI CHƠI VỚI KIẾN TRÚC AWS SERVERLESS

## MỞ ĐẦU
Phát triển game là một quá trình lặp đi lặp lại cao độ với các yêu cầu thay đổi nhanh chóng. Nhiều nhà phát triển game muốn tối ưu hóa thời gian xây dựng tính năng và giảm thời gian cấu hình máy chủ, quản lý cơ sở hạ tầng và mở rộng quy mô. Việc áp dụng kiến trúc AWS Serverless mang lại 4 lợi ích cốt lõi: rút ngắn thời gian đưa sản phẩm ra thị trường, tiết kiệm chi phí, tự động mở rộng theo lượng người chơi, và tích hợp sẵn các dịch vụ.
Để chứng minh, dưới đây sẽ là dự án game web dựa trên kiến trúc serverless-first, sở hữu đầy đủ các tính năng thực tế như chế độ chơi đơn/nhiều người, đăng ký, nhắn tin, bảng xếp hạng và tạo nội dung.

## TỔNG QUAN VỀ SIMPLE TRIVIA SERVICE – GAME ĐỐ VUI ĐƠN GIẢN
### Giao diện người dùng (Front-end)
Giao diện của game được xây dựng dưới dạng Single Page Application (SPA) bằng Vue.js, giúp kết nối với các dịch vụ backend thông qua HTTPS và WebSockets. Frontend này được xây dựng, triển khai và lưu trữ bằng AWS Amplify mà không cần quản lý máy chủ.
### Kiến trúc Backend và các dịch vụ sử dụng
Backend được định nghĩa thông qua các mẫu AWS Serverless Application Model (AWS SAM). Kiến trúc sử dụng sự kết hợp của nhiều dịch vụ đa dạng:
- Các dịch vụ Serverless chính: AWS Lambda (chạy mã vi dịch vụ), Amazon API Gateway và AWS IoT (cung cấp endpoint cho HTTP và WebSockets), Amazon DynamoDB (lưu trữ dữ liệu), và Amazon SNS (nhắn tin pub/sub).
- Các dịch vụ hỗ trợ khác: Amazon Cognito để quản lý đăng nhập, Athena/Kinesis/S3 để phân tích dữ liệu, và Amazon ElastiCache for Redis (không phải serverless) được đặt trong VPC để đáp ứng yêu cầu độ trễ cực thấp.
### Bảo mật và Giao tiếp
Người chơi cần đăng ký và đăng nhập thông qua Amazon Cognito; sau khi xác thực, hệ thống sẽ trả về token JWT để API Gateway xác thực các yêu cầu gửi đến Lambda. Đối với kết nối IoT, bảo mật được tăng cường thêm thông qua các chính sách của AWS IAM.
### Mô hình kiến trúc chế độ chơi của Simple Trivia Service
Tùy thuộc vào chế độ chơi, game áp dụng các kiến trúc backend khác nhau:
- Chế độ chơi đơn: Sử dụng API Gateway (HTTP API) cho giao tiếp một chiều từ người chơi đến hệ thống. Các hàm Lambda xử lý logic trò chơi và chấm điểm. Đặc biệt, điểm số và tiến trình của người chơi được cập nhật bất đồng bộ qua Amazon SNS, giúp người chơi nhận kết quả ngay lập tức mà không phải chờ đợi hệ thống ghi vào cơ sở dữ liệu.
- Chế độ nhiều người chơi - Thông thường và Cạnh tranh: Chế độ này yêu cầu giao tiếp hai chiều liên tục, do đó sử dụng API Gateway WebSockets. Trạng thái của game được quản lý trực tiếp bởi máy khách của chủ phòng. Hệ thống dùng DynamoDB để theo dõi những người chơi nào đang kết nối và tham gia vào phòng nào.
- Chế độ nhiều người chơi - Bảng điểm trực tiếp: Cấu trúc này phức tạp hơn, sử dụng AWS IoT (WebSockets qua MQTT) làm phương thức truyền tải chính. Điểm khác biệt lớn nhất là trạng thái trò chơi được chuyển từ máy khách sang lưu trữ tại backend bằng cách sử dụng ElastiCache for Redis nhằm đảm bảo tốc độ phản hồi tính bằng mili-giây, giúp bảng điểm của toàn bộ người chơi được cập nhật theo thời gian thực.
## KẾT LUẬN
Thông qua dự án thực tế Simple Trivia Service, đã minh chứng được rằng một hệ sinh thái AWS hoàn toàn có thể xử lý mượt mà và linh hoạt mọi yêu cầu khắt khe nhất của ngành game. Kiến trúc Serverless không chỉ đơn thuần là một giải pháp tối ưu chi phí, mà nó đang thực sự định hình lại tư duy thiết kế và vận hành của các nhà phát triển game. Bằng cách loại bỏ hoàn toàn gánh nặng cấu hình máy chủ và quản lý hạ tầng cơ sở, phương pháp tiếp cận "serverless-first" trao quyền cho các đội ngũ phát triển dồn toàn bộ tâm huyết vào việc cốt lõi nhất: sáng tạo nội dung, nâng cao trải nghiệm người chơi và rút ngắn tối đa thời gian đưa sản phẩm ra thị trường.

![Blog3](/images/3-BlogsPosted/Blog3.png)

[Link bài blog đã đăng](https://www.facebook.com/groups/awsstudygroupfcj/posts/2209312269833733?locale=vi_VN)

[Link tài liệu tham khảo](https://aws.amazon.com/blogs/compute/building-a-serverless-multiplayer-game-that-scales/)