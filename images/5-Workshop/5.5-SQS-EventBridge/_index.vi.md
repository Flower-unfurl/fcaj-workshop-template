---
title: "Triển khai SQS & EventBridge"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

Trong phần này, bạn sẽ thiết lập **Amazon SQS** và **Amazon EventBridge** — hai dịch vụ đảm nhiệm vai trò xử lý bất đồng bộ và lên lịch tự động trong kiến trúc hệ thống game.

---

## I. Tổng quan
Trong kiến trúc của Chrono Genesis Game, **Amazon SQS** được sử dụng để tách rời các luồng xử lý (decoupling) nhằm đảm bảo hiệu suất thời gian thực, trong khi **Amazon EventBridge** đóng vai trò lên lịch tự động cho các tác vụ định kỳ.

![Tổng quan SQS và EventBridge](/images/5-Workshop/SQS%20%26%20EventBridge/1.overall/1.png)

---

## II. Cấu hình Amazon SQS

### Tạo Dead-Letter Queue (DLQ) cho Timeouts
**Mục đích:** Hàng đợi DLQ dự phòng để lưu trữ các thông điệp (messages) bị lỗi, không thể xử lý sau nhiều lần thử, giúp quá trình debug dễ dàng hơn mà không làm gián đoạn hệ thống.

- **Bước 1:** Truy cập giao diện Amazon SQS, nhấn nút **Create queue**. Tại mục Details, chọn loại hàng đợi là **Standard**.

- **Bước 2:** Nhập tên hàng đợi là `chrono-turn-timeouts-dlq`. Ở phần Configuration, giữ nguyên Visibility timeout là 30 seconds và Delivery delay là 0 seconds.

![Tạo DLQ 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/1.png)

- **Bước 3:** Cuộn xuống phần Access policy, đánh dấu chọn phương thức **Basic** để giữ cấu hình phân quyền mặc định.

![Tạo DLQ 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/2.png)

- **Bước 4:** Cuộn xuống cuối trang, bỏ qua các thiết lập nâng cao và nhấn nút **Create queue** màu cam để hoàn tất.

![Tạo DLQ 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/3.png)


![Tạo DLQ 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/1.%20chrono-turn-timeouts-dlq/4.png)

### Tạo Queue chính chrono-turn-timeouts
**Mục đích:** Lưu trữ các tín hiệu đếm ngược thời gian cho mỗi lượt đi của người chơi. Tận dụng tính năng "Delivery delay" của SQS để hẹn giờ kích hoạt Lambda tự động bỏ lượt nếu người chơi không phản hồi.

- **Bước 1:** Tiếp tục nhấn **Create queue** và chọn loại **Standard** Queue.

- **Bước 2:** Đặt tên queue là `chrono-turn-timeouts`. Đặc biệt tại mục Configuration, điều chỉnh **Delivery delay thành 60 seconds** (tương đương với thời gian tối đa của 1 lượt đánh). Giữ Visibility timeout là 30 seconds.
![Tạo Queue Timeout 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/1.png)


- **Bước 3:** Các thông số Receive message wait time đặt là 0, Message retention period là 4 days. Giữ Access policy là **Basic**.

![Tạo Queue Timeout 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/2.png)

- **Bước 4:** Kích hoạt mục **Dead-letter queue** (chọn Enabled), sau đó trỏ trường Dead-letter queue ARN về hàng đợi `chrono-turn-timeouts-dlq` vừa tạo trước đó. Nhập Maximum receives là 10. Sau đó nhấn Create queue.

![Tạo Queue Timeout 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/3.png)

![Tạo Queue Timeout 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/4.png)

- **Bước 5:** Chuyển sang giao diện AWS Lambda, mở hàm `processGameEngine`. Vào tab Configuration > Environment variables, thêm biến môi trường `TURN_TIMEOUT_QUEUE_URL` và gán giá trị là đường link HTTPS của queue `chrono-turn-timeouts`.
![Tạo Queue Timeout 5](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/5.%20Add%20env%20sqs%20for%20Lambda%20processGameEngine.png)

- **Bước 6:** Lặp lại thao tác tương tự cho hàm Lambda `handleTimeout`: thêm biến môi trường `TURN_TIMEOUT_QUEUE_URL` để hàm này có thể lấy thông tin SQS.
![Tạo Queue Timeout 6](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/6.%20Add%20env%20sqs%20for%20Lambda%20handleTimeout.png)

- **Bước 7:** Lặp lại thao tác tương tự cho hàm Lambda `startMatch`: thêm biến môi trường `TURN_TIMEOUT_QUEUE_URL` để hàm này có thể kích hoạt bộ đếm giờ ngay khi chia bài.
![Tạo Queue Timeout 7](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/7.%20Add%20env%20sqs%20for%20Lambda%20startMatch.png)

- **Bước 8:** Tại màn hình tổng quan của hàm **Lambda HandleTimeout-function**, chuyển sang tab **Configuration** và chọn mục **General configuration**. Nhấn nút **Edit** để điều chỉnh cấu hình cơ bản của hàm: thiết lập Memory (Bộ nhớ) thành 256 MB và Timeout (Thời gian chờ) thành 10 giây. Sau khi lưu lại, hệ thống sẽ xuất hiện dải thông báo màu xanh xác nhận cập nhật hàm thành công.
![Tạo Queue Timeout 8](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/8.edit%20general%20configuration%20of%20Lambda%20handleTimeout%20.png)

- **Bước 9:** Nhấp vào nút **Add trigger** của Lambda `handleTimeout`. Tại cửa sổ cấu hình Trigger, chọn SQS làm nguồn, trỏ tới SQS queue `chrono-turn-timeouts`, thiết lập Batch size là 10. Đánh dấu Report batch item failures và nhấn Add.
![Tạo Queue Timeout 9](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/9.%20trigger%20sqs%20cho%20Lambda%20handleTimeout.png)

![Tạo Queue Timeout 10](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/delayed%20SQS/2.%20chrono-turn-timeouts/10.png)

- **Bước 10:** Sau khi thêm, hãy kiểm tra lại bảng Triggers của Lambda `handleTimeout` để đảm bảo kết nối SQS hiển thị trạng thái `Enabled`.


### Tạo Queue cho match-result
**Mục đích:** Hàng đợi tiếp nhận thông điệp ngay khi trận đấu kết thúc. Nhiệm vụ của nó là trung chuyển dữ liệu trận đấu ra luồng xử lý nền, đảm bảo hàm `endMatch` phản hồi cho client nhanh nhất có thể.

- **Bước 1:** Trở lại SQS, nhấn **Create queue** với phân loại **Standard**.

- **Bước 2:** Đặt tên là `match-result-queue`. Khác với timeout queue, hàng đợi này giữ **Delivery delay là 0** và Visibility timeout là 30 seconds.
![Tạo Queue Match Result 1](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/1.png)

![Tạo Queue Match Result 2](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/2.png)

- **Bước 3:** Cuộn xuống phần Access policy, vẫn chọn **Basic** mặc định.
![Tạo Queue Match Result 3](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/3.png)

- **Bước 4:** Cuộn xuống cuối trang và nhấn **Create queue**.
![Tạo Queue Match Result 4](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/4.png)

- **Bước 5:** Khi hàng đợi đã được tạo thành công, chuyển sang tab **Lambda triggers** ở menu bên dưới.
![Tạo Queue Match Result 5](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/6.png)

- **Bước 6:** Tại giao diện Add trigger của hàm Lambda, chọn nguồn kích hoạt (source) là **SQS**. Tại mục SQS queue, tìm và chọn hàng đợi **`Match-Result-queue`**. Tiếp tục thiết lập thông số Batch size là 10 và Batch window là 5. Đảm bảo ô Activate trigger đã được tích chọn, sau đó nhấn nút **Add** ở cuối trang.
![Tạo Queue Match Result 6](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/7.%20Lambda%20-%20tab%20trigger.png)

- **Bước 7:** Sau khi thêm thành công, hệ thống sẽ đưa bạn trở lại màn hình tổng quan của hàm **PostMatchWorker-function**. Chuyển sang tab **Configuration** và chọn mục **Triggers**, bạn sẽ thấy hàng đợi **SQS Match-Result-queue** vừa cấu hình đã được liên kết thành công với hàm Lambda.
![Tạo Queue Match Result 7](/images/5-Workshop/SQS%20%26%20EventBridge/2.SQS/SQS%20match-result-queue%20for%20Lambda%20postMatchWorker/8.%20Add%20trigger.png)

---

## III. Cấu hình Amazon EventBridge
**Mục đích:** Lên lịch (Cron Job) tự động gọi hàm `rebuildLeaderboardRank` theo chu kỳ để sắp xếp lại bảng xếp hạng.

- **Bước 1:** Truy cập giao diện Amazon EventBridge, thanh công cụ bên trái chọn **Schedules**, sau đó nhấn nút **Create schedule** màu cam.

- **Bước 2:** Ở Step 1 (Specify schedule detail), nhập tên Schedule name là `rebuild-global-leaderboard`. Schedule group chọn `default`.

![EventBridge 1](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/1.%20Create%20schedule.png)

![EventBridge 2](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/2.%20step%201.png)

- **Bước 3:** Cuộn xuống phần Schedule pattern, chọn **Recurring schedule**. Đánh dấu chọn **Rate-based schedule** và thiết lập chu kỳ là **10 minutes** (10 phút 1 lần). Nhấn Next.
![EventBridge 3](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/3.%20step%201.png)

- **Bước 4:** Ở Step 2 (Select target), mục Target API chọn **AWS Lambda**. Tại ô Lambda function, chỉ định hàm mục tiêu là `Rebuild_Leader_Board_Function` (hoặc `rebuildLeaderboardRank`). Nhấn Next.
![EventBridge 4](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/4.%20step%202.png)

- **Bước 5:** Ở Step 3 (Settings), chắc chắn rằng Schedule state đang được Enable. Action after schedule completion chọn **NONE**.

- **Bước 6:** Kéo xuống mục Retry policy, chỉnh **Retry attempts** là 2 và **Maximum retry delay** là 10. Dead-letter queue chọn **None**. Nhấn Next.
![EventBridge 5](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/5.%20step%203.png)

- **Bước 7:** Bước Review (Step 4), kiểm tra lại tóm tắt cấu hình: Tên, Rate expression (`rate (10 minutes)`), Target.
![EventBridge 7](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/7.%20step%204.png)

- **Bước 8:** Kiểm tra Execution role đã được gán quyền phù hợp tự động. Nhấn nút **Create schedule** ở góc dưới cùng.
![EventBridge 8](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/8.%20step%204.png)

- **Bước 9:** Bạn có thể quay lại giao diện thiết kế AWS Lambda của hàm `rebuildLeaderboardRank`, sẽ thấy biểu tượng EventBridge (CloudWatch Events) tự động xuất hiện ở phần Triggers với trạng thái kết nối thành công.
![EventBridge 9](/images/5-Workshop/SQS%20%26%20EventBridge/3.EventBridge/9.%20Lambda%20rebuildLeaderboardRank%20da%20duoc%20cap%20nhat%20trigger.png)
