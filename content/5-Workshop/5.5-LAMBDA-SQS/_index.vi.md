---
title: "Triển khai Logic với AWS Lambda & SQS"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

Trong phần này, bạn sẽ triển khai mã nguồn, cấu hình biến môi trường và kiểm thử kết nối cho hàm **ConnectHandler-function** trên AWS Lambda.

---

### 1. Tạo các hàm Lambda

Trước khi triển khai mã nguồn, cần tạo các hàm AWS Lambda sẽ được sử dụng trong hệ thống.

#### Bước 1

Truy cập dịch vụ **AWS Lambda**, chọn **Functions**, sau đó nhấn **Create function**.

#### Bước 2

Tại trang **Create function**, chọn **Author from scratch**.

Cấu hình các thông tin sau:

- **Function name:** Đặt tên cho Lambda theo chức năng (ví dụ: `ConnectHandler-function`).
- **Runtime:** `Node.js 24.x`.
- Mở phần **Additional settings**.
- Bật **Custom execution role**.
- Chọn IAM Role đã được tạo ở bước thiết lập trước (ví dụ: **Chrono-Lambda-Execution-Role**).

Sau khi hoàn tất, nhấn **Create function**.

![Tạo Lambda Function](/images/5-Workshop/5.5-Policy/set_up_aws_lambda1.png)

#### Bước 3

Thực hiện tương tự để tạo các Lambda còn lại:

- **DisconnectHandler-function**
- **StartMatch-function**
- **HandleTimeout-function**
- **ProcessGameEngine-function**
- **SaveDeck-function**
- **CancelMatch-function**
- **EndMatch-function**
- **PostMatchWorker-function**
- **chrono-http-backend**

Sau khi hoàn tất, danh sách Lambda sẽ hiển thị tương tự như hình dưới đây.

![Danh sách Lambda sau khi tạo](/images/5-Workshop/5.5-Policy/set_up_aws_lambda2.png)

---

### 2. Triển khai mã nguồn cấu hình cho hàm Lambda

1. Trong giao diện chi tiết của hàm Lambda **ConnectHandler-function**, chuyển đến tab **Code**. Tìm nút **Upload from** và chọn tùy chọn **.zip file**.
   ![Upload file zip cho hàm Lambda](/images/5-Workshop/5.5-Policy/10.png)
   ![Upload file zip cho hàm Lambda](/images/5-Workshop/5.5-Policy/806.png)

2. Một cửa sổ popup hiện ra, click vào **Upload** (hoặc **Choose file**) và chọn tệp `index.zip` đã được đóng gói sẵn từ máy tính cá nhân. Sau đó nhấn nút **Open** để tải code lên.

![Upload file zip cho hàm Lambda](/images/5-Workshop/5.5-Policy/55.png)

3. Đợi vài giây, hệ thống sẽ hiển thị thông báo màu xanh **"Successfully updated the function ConnectHandler-function"** xác nhận quá trình tải lên thành công.
   ![Upload file zip cho hàm Lambda](/images/5-Workshop/5.5-Policy/818.png)

4. Chuyển sang tab **Configuration**, sau đó chọn mục **Environment variables** ở menu bên trái.
   ![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/153.png)

5. Click vào nút **Edit** và sau đó chọn **Add environment variable**.

6. Điền các thông tin sau để cấu hình kết nối an toàn đến Database:

   | Key              | Value                              |
   | ---------------- | ---------------------------------- |
   | `DB_SECRET_NAME` | `ChronoGame/PartnerDB/Credentials` |

7. Nhấn **Save** để lưu cấu hình.

![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/850.png)

8. Chuyển sang tab **Test**. Tại mục **Test event**, chọn **Create new event** và đặt tên cho sự kiện là `Test-connection`. Sau đó nhấn **Save**

9. Click vào nút **Test** màu cam để chạy thử hàm Lambda.

10. Mở rộng mục **Execution results (Details)** để xem kết quả kiểm thử. Nếu hệ thống trả về `statusCode: 200` và `body: "Connected successfully."` cùng với thông báo **"Executing function: succeeded"** màu xanh, nghĩa là bạn đã cấu hình thành công.

![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/936.png)

---

### 3. Cấu hình Lambda PostMatchWorker

Bước 1: Trong giao diện chi tiết của hàm **Lambda PostMatchWorker-function**, chuyển sang tab **Configuration**, chọn mục **Environment variables** và click **Edit** để cấu hình các biến môi trường kết nối cơ sở dữ liệu (như `DB_ACCESS_KEY_ID`, `DB_REGION`, `DB_SECRET_ACCESS_KEY`)
![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/postMatch.png)

Bước 2: Chuyển sang tab **Test**, tại mục **Test event** chọn **Create new event** (hoặc **Edit saved event**), đặt tên sự kiện là **test-postMatchWorker**, dán đoạn mã JSON giả lập SQS message vào khung **Event JSON** rồi nhấn **Save** để lưu.
![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/723.png)

Bước 3: Click nút **Test** màu cam để chạy thử hàm. Sau đó, mở rộng mục **Execution results (Details)** để kiểm tra: nếu thấy thông báo **"Executing function: succeeded"** màu xanh và kết quả trả về gồm `statusCode: 200` cùng `body: "Post match processing complete."` , tức là luồng xử lý của bạn đã hoạt động chính xác.
![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/641.png)

---

### 4. Cấu hình Lambda ProcessGameEngine

Bước 1: Trong giao diện chi tiết của hàm **Lambda ProcessGameEngine-function**, tại tab **Code**, tiến hành cập nhật mã nguồn bằng cách chọn upload từ tệp **.zip**. Khi quá trình tải lên hoàn tất, hệ thống sẽ hiển thị thông báo màu xanh **"Successfully updated the function ProcessGameEngine-function"** để xác nhận.
![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/842.png)

Bước 2: Chuyển sang cấu hình kiểm thử (thường ở tab **Test**), tạo một sự kiện mới và đặt tên tại ô **Event name** là **Test-EndTurn**. Trong khung **Event JSON**, dán đoạn mã giả lập một request gửi từ API Gateway (chứa các thông tin như connectionId và body chứa hành động END_TURN của người chơi). Sau đó nhấn **Save** để chuẩn bị cho quá trình chạy thử.
![Cấu hình Environment Variables cho Lambda](/images/5-Workshop/5.5-Policy/708.png)

### 5. Cấu hình các Lambda còn lại

Tiếp tục triển khai và cấu hình cho các hàm Lambda còn lại gồm:

- **SaveDeck-function**
- **StartMatch-function**
- **HandleTimeout-function**
- **DisconnectHandler**
- **CancelMatch**
- **EndMatch**
- **Chrono-http**

Sau khi tải mã nguồn lên thành công, tiến hành cấu hình các biến môi trường cho từng Lambda.

#### Bước 1: Cập nhật Environment Variables

Lần lượt mở các hàm **ProcessGameEngine-function**, **StartMatch-function**, **HandleTimeout-function**, **CancelMatch-function** và **SaveDeck-function**

Chuyển sang:

**Configuration** → **Environment variables** → **Edit**

- Biến môi trường cho chrono-http-backend
  ![chrono-http-backend](/images/5-Workshop/5.5-Policy/chrono_http_be.png)

- Biến môi trường cho ConnectHandler
  ![ConnectHandler](/images/5-Workshop/5.5-Policy/connect_handler_funtion.png)

- Biến môi trường cho End Match
  ![End Match ](/images/5-Workshop/5.5-Policy/endmatch_funtion.png)

Sau đó cập nhật các biến môi trường theo yêu cầu của dự án.

![Cập nhật Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_variable5.png)

![Cập nhật Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_update2.png)

![Cập nhật Environment Variables](/images/5-Workshop/5.5-Policy/enviroment_update3.png)

#### Bước 2: Cấu hình Lambda HandleTimeout

Mở **HandleTimeout-function**, kiểm tra lại toàn bộ các biến môi trường và lưu cấu hình.

Thay đổi cấu hình của hàm Lambda theo hình minh họa dưới đây.

![Cấu hình HandleTimeout](/images/5-Workshop/5.5-Policy/lambda_HandleTimeout1.png)

![Cấu hình HandleTimeout](/images/5-Workshop/5.5-Policy/lambda_HandleTimeout2.png)

---

### 6. Tạo hàng đợi SQS chrono-turn-timeouts

Để xử lý timeout bất đồng bộ, hàm **ProcessGameEngine-function** sẽ gửi các sự kiện timeout đến một hàng đợi Amazon SQS. Vì vậy cần tạo một queue mới dành riêng cho chức năng này.

#### Bước 1

Truy cập dịch vụ **Amazon SQS**, chọn **Create queue**.

Tại mục **Details**, chọn:

- **Queue type:** Standard
- **Name:** `chrono-turn-timeouts`

![Tạo Queue chrono-turn-timeouts](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts1.png)

#### Bước 2

Giữ nguyên các cấu hình mặc định của hàng đợi, đảm bảo **Server-side encryption** được bật bằng **Amazon SQS managed key (SSE-SQS)**, sau đó tạo Queue.

![Tạo Queue chrono-turn-timeouts](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts2.png)

#### Bước 3

Sau khi tạo thành công, kiểm tra lại thông tin của Queue để đảm bảo queue **chrono-turn-timeouts** đã được khởi tạo.

![Tạo Queue chrono-turn-timeouts](/images/5-Workshop/5.5-Policy/chrono-turn-timeouts3.png)

---

### 7. Thêm Trigger SQS cho Lambda HandleTimeout

Sau khi Queue được tạo, tiến hành cấu hình để **HandleTimeout-function** tự động nhận các message từ **chrono-turn-timeouts**.

#### Bước 1

Mở **HandleTimeout-function**.

Chọn:

**Configuration** → **Triggers** → **Add trigger**

Thiết lập:

- **Source:** Amazon SQS
- **SQS Queue:** `chrono-turn-timeouts`
- **Batch size:** `10`
- Đánh dấu **Activate trigger**

Sau đó nhấn **Add**.

![Thêm Trigger cho HandleTimeout](/images/5-Workshop/5.5-Policy/SQS_lambda_HandleTimeout1.png)

#### Bước 2

Đợi vài phút để AWS hoàn tất việc thiết lập Trigger.

Khi trạng thái chuyển sang **Enabled**, điều đó có nghĩa là **HandleTimeout-function** đã có thể tự động nhận các message timeout được gửi từ **ProcessGameEngine-function** thông qua hàng đợi **chrono-turn-timeouts**.

![Thêm Trigger cho HandleTimeout](/images/5-Workshop/5.5-Policy/SQS_lambda_HandleTimeout2.png)

---

### 8. Tạo hàng đợi Match-Result-queue

Sau khi hoàn tất cấu hình xử lý timeout, tiếp tục tạo một hàng đợi Amazon SQS để xử lý các công việc sau khi trận đấu kết thúc (**PostMatchWorker**).

#### Bước 1

Truy cập dịch vụ **Amazon SQS** và chọn **Create queue**.

Tại mục **Details**, chọn:

- **Queue type:** Standard
- **Name:** `Match-Result-queue`

Các cấu hình còn lại giữ nguyên mặc định.

![Tạo Match-Result-queue](/images/5-Workshop/5.5-Policy/246.png)

#### Bước 2

Cuộn xuống mục **Encryption**, đảm bảo **Server-side encryption** được bật và sử dụng **Amazon SQS managed key (SSE-SQS)**.

![Cấu hình Encryption](/images/5-Workshop/5.5-Policy/131.png)

#### Bước 3

Tại mục **Access policy**, chọn **Basic** và giữ quyền mặc định là **Only the queue owner**.

![Cấu hình Access Policy](/images/5-Workshop/5.5-Policy/108.png)

#### Bước 4

Cuộn xuống cuối trang, giữ nguyên các thiết lập mặc định cho **Dead-letter queue** và **Redrive allow policy**, sau đó nhấn **Create queue** để tạo hàng đợi.

![Hoàn tất tạo Queue](/images/5-Workshop/5.5-Policy/313.png)

---

### 9. Thêm Trigger SQS cho Lambda PostMatchWorker

Sau khi tạo thành công **Match-Result-queue**, tiến hành cấu hình để **PostMatchWorker-function** tự động nhận các message được gửi từ **EndMatch-function**.

#### Bước 1

Mở **PostMatchWorker-function**.

Chọn:

**Configuration** → **Triggers** → **Add trigger**

Thiết lập:

- **Source:** Amazon SQS
- **SQS Queue:** `Match-Result-queue`
- **Batch size:** `10`
- Đánh dấu **Activate trigger**

Sau đó nhấn **Add**.

![Thêm Trigger cho PostMatchWorker](/images/5-Workshop/5.5-Policy/351.png)

#### Bước 2

Đợi vài phút để AWS hoàn tất việc tạo Trigger.

Khi trạng thái chuyển sang **Enabled**, điều đó có nghĩa là **PostMatchWorker-function** đã có thể tự động nhận các message từ **Match-Result-queue** để xử lý các tác vụ sau khi trận đấu kết thúc.

![Trigger PostMatchWorker](/images/5-Workshop/5.5-Policy/324.png)

---
