---
title: "Bản đề xuất"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Chrono Genesis Game

## Web game đối kháng (turn – base trading cards game) được xây dựng theo kiến trúc Serverless trên nền tảng AWS

### 1. Tóm tắt điều hành

Dự án là Chrono Genesis Game mang thể loại Web game đối kháng (turn – base trading cards game) được xây dựng theo kiến trúc Serverless Real-time Architecture trên nền tảng AWS.

Toàn bộ game sử dụng WebSocket để đồng bộ dữ liệu theo thời gian thực. Các nghiệp vụ của trận đấu được xử lý bởi nhiều AWS Lambda chuyên biệt. Hệ thống sử dụng duy nhất Amazon DynamoDB làm trung tâm dữ liệu toàn diện, đảm nhiệm cả hai vai trò: lưu trữ trạng thái trận đấu (Game State) với đơn vị độ trễ tính bằng milisecond trong thời gian thực, đồng thời lưu trữ dữ liệu lâu dài (User, Deck, Match History, Logs) một cách an toàn và tối ưu chi phí.

### 2. Tuyên bố vấn đề

**_Vấn đề hiện tại_**

- Các hệ thống game thời gian thực truyền thống yêu cầu chi phí duy trì máy chủ liên tục dù không có người chơi.

- Độ trễ mạng ảnh hưởng tiêu cực đến trải nghiệm của tựa game mang tính chiến thuật tính toán liên tục.

**_Giải pháp_**
Triển khai Serverless Real-time Architecture qua Amazon API Gateway (WebSocket API) và các hàm AWS Lambda để tạo luồng xử lý độc lập. Quy về một luồng Game Engine duy nhất tương tác trực tiếp với Amazon DynamoDB để cập nhật trạng thái, đảm bảo độ trễ và tiết kiệm chi phí.

### 3. Kiến trúc giải pháp

Nền tảng áp dụng kiến trúc AWS Serverless để vận hành ứng dụng Web Game đối kháng thẻ bài thời gian thực, có khả năng tự động mở rộng quy mô đáp ứng hàng nghìn người chơi đồng thời. Giao diện người dùng được phân phối qua AWS Amplify và Route 53, được bảo mật và xác thực danh tính bởi Amazon Cognito.

Các kết nối thời gian thực hai chiều (Real-time WebSocket) được định tuyến qua Amazon API Gateway để tương tác trực tiếp với tập hợp các hàm AWS Lambda (Start Match, Process Game Engine, Save Deck, Handle Timeout, End Match) nhằm xử lý toàn bộ game logic tập trung.

Dữ liệu trò chơi và thông tin kết nối được lưu trữ tại Amazon DynamoDB. Ngoài ra, sau khi kết thúc trận đấu, các sự kiện được đẩy vào Amazon SQS để hàm Lambda (Post Match Worker) xử lý bất đồng bộ các tác vụ cập nhật Rank, EXP và lưu lịch sử trận đấu, đảm bảo hệ thống đạt hiệu năng cao và độ trễ cực thấp.

![Architecture](/images/2-Proposal/arch.png)

**_Dịch vụ AWS sử dụng_**

- _AWS Amplify_: Lưu trữ (hosting) và phân phối giao diện web game (Frontend).

- _Amazon Route 53_: Dịch vụ DNS quản lý tên miền, định tuyến lưu lượng người chơi (Players) truy cập vào ứng dụng.

- _Amazon Cognito_: Quản lý định danh, xác thực người chơi và cấp phát, kiểm chứng JWT Token (JWT Verification).

- _Amazon API Gateway (HTTP & WebSocket)_:

  - _HTTP API_: Tiếp nhận và xử lý các yêu cầu RESTful từ client, sau khi đi qua bước xác thực JWT sẽ gọi tới các Lambda HTTP backend.

  - _WebSocket API_: Quản lý kết nối thời gian thực hai chiều (real-time) liên tục giữa người chơi và máy chủ game.

- _AWS Lambda_: Đóng vai trò xử lý logic cốt lõi, được chia thành nhiều nhóm chức năng độc lập:

  - _HTTP Backend (chrono-http-backend)_: Xử lý các tác vụ quản lý như Deck (bộ bài/trang bị), Leaderboard (bảng xếp hạng), Rank và Match.

  - _WebSocket Handlers_: Xử lý vòng đời kết nối và logic trận đấu gồm: ConnectHandler, DisconnectHandler, Start Match, Process Game Engine, Cancel Match, và End Match.

  - _Background Workers_: Handle Timeout (xử lý logic khi hết thời gian) và Post Match Worker (cập nhật kết quả sau khi trận đấu kết thúc).

  - _Scheduled Task_: Hàm Rebuild Leaderboard-Rank dùng để tính toán và cập nhật lại bảng xếp hạng.

- _Amazon EventBridge (Schedule)_: Bộ định thời gian (Cronjob) tự động kích hoạt hàm Lambda Rebuild Leaderboard-Rank định kỳ mỗi 10 phút.

- _Amazon SQS (Simple Queue Service)_: Hàng đợi thông điệp bất đồng bộ, bao gồm:

  - _Delayed SQS_: Nằm giữa Process Game Engine và Handle Timeout để quản lý các sự kiện có độ trễ/đếm ngược trong game.

  - _SQS Chuẩn_: Nhận dữ liệu từ hàm End Match và đẩy sang cho Post Match Worker xử lý, giúp giảm tải cho luồng chính.

- _Amazon DynamoDB_: Cơ sở dữ liệu NoSQL tốc độ cao, bao gồm các bảng (tables) chuyên biệt để lưu trữ toàn bộ dữ liệu hệ thống: UserProfile, MatchHistory, GameState, GameLogs, và Connections.

- _Security & Monitoring (Bảo mật và Giám sát)_:

  - _IAM_: Kiểm soát truy cập và phân quyền tài nguyên.

  - _KMS & Secrets Manager_: Quản lý khóa mã hóa và lưu trữ an toàn các dữ liệu nhạy cảm.

  - _CloudWatch & X-Ray_: Lưu trữ nhật ký (logs), giám sát hiệu năng hệ thống và truy vết (tracing) các luồng request để tối ưu và gỡ lỗi.

**_Thiết kế thành phần_**

- _Định tuyến real-time_: Amazon API Gateway kết hợp Route 53 quản lý kết nối WebSocket hai chiều giữa người chơi và hệ thống.

- _Xử lý game logic_: Tập hợp các hàm AWS Lambda đóng vai trò Game Engine tập trung.

- _Xử lý bất đồng bộ_: Amazon SQS nhận sự kiện kết thúc trận đấu để Lambda worker tự động tính toán Rank, EXP và lưu lịch sử.

- _Xử lý dữ liệu_: Amazon DynamoDB lưu trạng thái bàn cờ, thông tin kết nối và hồ sơ người chơi.

- _Giao diện web_: Xây dựng bằng React / TypeScript, đóng gói và phân phối qua mạng lưới CDN của AWS Amplify.

- _Quản lý người dùng_: Sử dụng Amazon Cognito User Pool để quản lý toàn bộ chu trình của tài khoản (đăng ký, xác thực, đổi mật khẩu và thu hồi phiên đăng nhập).

### 4. Triển khai kỹ thuật

**_Các giai đoạn triển khai_**

1. Khởi tạo hạ tầng: Triển khai môi trường, tên miền và thiết lập CI/CD thông qua AWS Amplify.

2. Kết nối & Xác thực: Cấu hình Amazon Cognito cho người dùng và thiết lập luồng kết nối WebSocket
   qua API Gateway.

3. Xây dựng Game Engine: Lập trình các hàm Lambda lõi (Start Match, Process Action, End Match)
   xử lý logic thẻ bài.

4. Hậu kỳ trận đấu: Cấu hình hàng đợi SQS và Lambda Worker để xử lý điểm Rank, lịch sử mà không gây nghẽn hệ thống.

5. Kiểm thử & Tối ưu: Giám sát X-Ray, CloudWatch, tối ưu bảo mật với WAF/IAM và thực hiện kiểm thử tải (Stress Test).

**_Yêu cầu kỹ thuật_**

- _Hạ tầng hệ thống_: AWS Amplify (Hosting & CI/CD), GitHub, Route 53 (tên miền), IAM và VPC để triển khai, quản lý và bảo mật hệ thống.

- _Nền tảng game_: Amazon Cognito (xác thực JWT), API Gateway (WebSocket), AWS Lambda (xử lý logic game), DynamoDB (lưu dữ liệu người chơi, trận đấu, bộ bài), Amazon SQS (xử lý tác vụ hậu kỳ), CloudWatch và X-Ray (giám sát), AWS WAF (bảo mật). Frontend sử dụng React kết nối WebSocket để đồng bộ trạng thái trận đấu theo thời gian thực.

### 5. Lộ trình & Mốc triển khai

- _Trước thực tập (Tháng 0)_: 1 tháng lên kế hoạch.
  - Tháng 1: Tìm hiểu và học các dịch vụ AWS, thực hành các bài Lab để cũng cố kiến thức.
  - Tháng 2: Thiết kế và điều chỉnh kiến trúc.
  - Tháng 3: Triển khai, kiểm thử, đưa vào sử dụng.
- _Sau triển khai_: Nghiên cứu và phát triển thêm các chức năng mới.

### 6. Ước tính ngân sách

**_Chi phí hạ tầng_**

- AWS Amplify: 0,00 - 0,02 USD/tháng (Hosting giao diện web Frontend, CI/CD tự động, nằm trong Free Tier 12 tháng).

- Amazon Route 53: 0,50 USD/tháng (Duy trì 01 Hosted Zone định tuyến, chưa tính phí mua tên miền ban đầu).

- Amazon Cognito: 0,00 USD/tháng (Quản lý và xác thực người dùng, cấp JWT, giới hạn dưới 50.000 MAU nằm trong Free Tier).

- Amazon API Gateway (HTTP & WebSocket): 0,00 - 0,02 USD/tháng (Bao gồm HTTP API cho các request RESTful và WebSocket API duy trì kết nối real-time. Khối lượng nhỏ ở mức MVP dư sức nằm dưới mốc 1 triệu requests/messages miễn phí).

- AWS Lambda: 0,00 USD/tháng (Dùng cho toàn bộ hệ thống tính toán: HTTP backend, Game Engine, các WebSocket Handlers, và Worker xử lý bất đồng bộ. Dưới 1 triệu requests và 400.000 GB-s của Free Tier).

- Amazon EventBridge (Schedule): 0,00 USD/tháng (Lên lịch kích hoạt hàm Lambda Rebuild Leaderboard-Rank mỗi 10 phút, tương đương khoảng 4.320 sự kiện/tháng. Nằm trong mức 1 triệu sự kiện miễn phí).

- Amazon SQS: 0,00 USD/tháng (Sử dụng 02 hàng đợi: Delayed SQS cho các sự kiện đếm ngược và SQS tiêu chuẩn cho Post Match Worker. Khối lượng message thấp, hoàn toàn miễn phí dưới ngưỡng 1 triệu requests).

- Amazon DynamoDB: 0,00 USD/tháng (Dành cho 5 bảng dữ liệu: UserProfile, MatchHistory, GameState, GameLogs, Connections. Cần cấu hình chế độ Provisioned với tổng công suất dưới 25 WCU và 25 RCU cho tất cả các bảng để đạt 0 USD trong Free Tier).

- _Bảo mật & Giám sát (Security & Monitoring)_:

  - AWS IAM: 0,00 USD/tháng (Quản lý phân quyền luôn luôn miễn phí).

  - AWS KMS: 0,00 USD/tháng (Nếu sử dụng các khóa mã hóa do AWS quản lý).

  - AWS Secrets Manager: ~0,40 USD/tháng.

  - Amazon CloudWatch & AWS X-Ray: 0,00 USD/tháng (Giám sát, lưu log và tracing luồng dữ liệu, dưới ngưỡng 5 GB log miễn phí/tháng).

- Truyền dữ liệu Internet (Data Transfer Out): 0,00 USD/tháng (Dưới ngưỡng 100 GB miễn phí/tháng).

- AWS WAF (Tùy chọn): 0,00 USD/tháng (nếu không dùng) / ≥ 5,00 USD/tháng (nếu bật 01 Web ACL để bảo vệ API Gateway khỏi các request độc hại).

**_Tổng chi phí dự kiến_**:

- Chi phí hạ tầng MVP (Chưa tính WAF): Khoảng 0,92 - 0,94 USD/tháng (~11 USD/năm).

- Chi phí hạ tầng MVP (Có WAF): Khoảng 5,94 USD/tháng (~71 USD/năm).

### 7. Đánh giá rủi ro

**_Ma trận rủi ro_**

- Lambda Cold Start gây giật lag lượt đi đầu: Khả năng xảy ra trung bình, mức độ ảnh hưởng trung bình.

- Mất kết nối mạng WebSocket từ phía người chơi: Khả năng xảy ra cao, mức độ ảnh hưởng cao.

- Chạm giới hạn AWS Quota: Khả năng xảy ra thấp, mức độ ảnh hưởng rất cao.

**_Chiến lược giảm thiểu_**

- Giảm thiểu Lambda Cold Start: Tối ưu thời gian khởi động bằng cách giảm kích thước package, tái sử dụng kết nối và chỉ cấu hình Provisioned Concurrency cho các Lambda xử lý thời gian thực (Process Game Engine) khi hệ thống có lưu lượng truy cập cao. Giải pháp này giúp giảm đáng kể độ trễ ở lượt đi đầu tiên nhưng vẫn tối ưu chi phí vận hành.

- Giảm thiểu mất kết nối WebSocket: Xây dựng cơ chế Auto-Reconnect ở Frontend kết hợp gửi cảnh báo định kỳ để phát hiện mất kết nối. Khi người chơi kết nối lại, API Gateway và Lambda cập nhật Connection ID mới vào DynamoDB, sau đó đồng bộ lại Game State hiện tại để người chơi tiếp tục trận đấu mà không cần tạo phiên mới.

- Giảm thiểu chạm giới hạn AWS Quota: Thiết lập CloudWatch Metrics và CloudWatch Alarms để giám sát số lượng kết nối WebSocket, Lambda Invocations và các tài nguyên quan trọng. Khi tài nguyên đạt khoảng 70–80% giới hạn, hệ thống gửi cảnh báo qua email để quản trị viên chủ động yêu cầu tăng hạn mức trước khi ảnh hưởng đến người dùng.

**_Kế hoạch dự phòng_**

- Mở rộng tài nguyên: Khi tài nguyên AWS tiệm cận Service Quota, quản trị viên yêu cầu tăng hạn mức và tạm thời giới hạn tạo trận đấu mới, ưu tiên tài nguyên cho các trận đang diễn ra nhằm đảm bảo tính ổn định của hệ thống.

### 8. Kết quả kỳ vọng

- _Cải tiến kỹ thuật_: Xây dựng thành công luồng Game Engine hoàn toàn trên nền tảng Serverless, thay thế máy chủ duy trì liên tục giúp tiết kiệm chi phí.

- _Giá trị dài hạn_: Nền tảng dữ liệu dùng để phát triển game, có thể tái sử dụng cho các dự án tương lai.
