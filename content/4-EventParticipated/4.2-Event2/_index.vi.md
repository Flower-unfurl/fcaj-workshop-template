---
title: "Event 2"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 4.2. </b> "
---


# Bài thu hoạch “FCAJ Community Day”

### Mục Đích Của Sự Kiện

- Sự kiện được tổ chức nhằm chia sẻ kiến thức chuyên sâu, kinh nghiệm thực chiến và các xu hướng công nghệ mới nhất về Cloud (AWS), Trí tuệ nhân tạo (AI), DevOps, phát triển game, cũng như định hướng phát triển sự nghiệp và kỹ năng làm việc nhóm trong ngành IT.

### Danh Sách Diễn Giả

- **Le Hoang Gia Dai** - Sinh viên năm cuối Đại học HUTECH
- **Bao Huynh** - Junior Cloud Native Developer tại Endava Vietnam, Founder của ITea Lab
- **Tran Trung Vinh** - System Administrator tại Central Retail Group
- **NNguyen Quoc Bao** - Diễn giả chủ đề Godot & AWS WebSockets
- **Truong Huy Phuoc** - Diễn giả chủ đề Kỹ năng làm việc nhóm
- **Viet Phat** - Sinh viên chuyên ngành AI tại Đại học Swinburne

### Nội Dung Nổi Bật

#### AWS WAF & ML NIDS
- Kết hợp Tường lửa ứng dụng web (AWS WAF) với Hệ thống phát hiện xâm nhập mạng bằng Machine Learning (NIDS) để khắc phục hạn chế của các rule truyền thống, giúp phát hiện các cuộc tấn công chưa từng có dựa trên hành vi mạng.
- Huấn luyện mô hình với tập dữ liệu CSE-CIC-IDS2018 và kiến trúc triển khai trên AWS.

#### Docker
- Giới thiệu công nghệ Containerization (Docker) và so sánh với máy ảo (Virtualization) truyền thống.
- Docker mang lại lợi ích nhẹ, chạy nhất quán trên nhiều môi trường và lý tưởng cho các kiến trúc Microservices hay CI/CD.

#### Hành trình từ IT Helpdesk đến Senior Sysadmin
- Chia sẻ kinh nghiệm thực tế khi thăng tiến trong nghề quản trị hệ thống, nhấn mạnh tầm quan trọng của việc hiểu biết Linux, Mạng, và tự động hóa.
- Cung cấp lộ trình hướng tới DevOps/Cloud, bao gồm Git, Terraform, Docker, Kubernetes và tư duy vận hành.

#### Multiplayer trong Cloud với Godot 
- Hướng dẫn xây dựng kiến trúc game nhiều người chơi bằng Godot 4 kết hợp với AWS WebSockets (API Gateway, Lambda, DynamoDB).
- So sánh các kiến trúc mạng và chỉ ra những giới hạn của kiến trúc Serverless so với việc dùng máy chủ chuyên dụng như AWS GameLift.

#### GraphRAG Architecture
- Giới thiệu phương pháp GraphRAG (Sử dụng đồ thị tri thức để cải thiện RAG), giúp mô hình AI có khả năng suy luận đa bước (multi-hop reasoning).
- Hướng dẫn xây dựng GraphRAG trên AWS bằng 2 cách: quản lý toàn phần (Amazon Bedrock, Neptune Analytics) hoặc tự xây dựng (LlamaIndex, Amazon Neptune).

#### Nghệ thuật làm việc nhóm
- Đề xuất 4 nguyên tắc trong làm việc nhóm: Mục tiêu rõ ràng và chung, Đúng người đúng việc, Giao tiếp cởi mở và Lắng nghe tích cực, Trách nhiệm cá nhân.
- Gợi ý sử dụng các công cụ số như Trello, ClickUp, Slack, Discord để tối ưu hóa hiệu suất công việc.

### Những Gì Học Được

- Em đã học được cách kiến trúc mạng và các dịch vụ đám mây (AWS) đang được ứng dụng rộng rãi trong nhiều lĩnh vực: từ bảo mật không gian mạng (NIDS), phát triển AI (GraphRAG), đến hạ tầng cho game (Multiplayer)
- Về mặt hệ thống, em hiểu rõ sự ưu việt của Docker so với máy ảo thông thường và lộ trình từng bước để phát triển từ một kỹ thuật viên IT lên vị trí Kỹ sư Cloud/DevOps
- Bên cạnh kỹ thuật, em cũng học được cách tư duy vận hành hệ thống, cách chuẩn bị phỏng vấn hiệu quả và các kỹ năng phối hợp nhóm



### Ứng Dụng Vào Công Việc
- Sử dụng Docker: Ứng dụng Docker vào môi trường phát triển và kiểm thử, hoặc vào các luồng CI/CD để đảm bảo ứng dụng chạy đồng nhất trên mọi máy tính, tránh lỗi xung đột môi trường.
- Cải thiện bảo mật: Cân nhắc tích hợp học máy (Machine learning) kết hợp với các dịch vụ tường lửa có sẵn để chủ động phân tích log và phát hiện các hành vi truy cập bất thường mà WAF thông thường không bắt được.
- Nâng cao hiệu suất nhóm: Ứng dụng 4 nguyên tắc vàng và thiết lập các công cụ như Trello, Slack để quản lý tiến độ và thông tin liên lạc rõ ràng hơn trong team dự án.

### Trải nghiệm trong event

Tham gia workshop **“FCAJ Community Day”** là một trải nghiệm rất bổ ích, giúp em có cái nhìn toàn diện về cách hiện đại hóa ứng dụng và cơ sở dữ liệu bằng các phương pháp và công cụ hiện đại. Một số trải nghiệm nổi bật:

#### Học hỏi từ các diễn giả có chuyên môn cao
- Sự kiện mang lại cơ hội tiếp thu kiến thức từ các kỹ sư giàu kinh nghiệm thực chiến tại các doanh nghiệp lớn (như Central Retail Group, Endava) cũng như các sinh viên công nghệ tài năng, mang tới góc nhìn rất thực tế về lộ trình nghề nghiệp và công nghệ.

#### Trải nghiệm kỹ thuật thực tế
- Các diễn giả đều có các minh họa rõ ràng như sơ đồ kiến trúc hệ thống trên AWS, bảng so sánh mô hình mạng, và cả phần Demo trực tiếp (Live Demonstration) cách kết nối hai luồng client trên Godot hay cách chạy Docker, giúp biến lý thuyết thành trải nghiệm trực quan.

#### Ứng dụng công cụ hiện đại
- Sự kiện giúp mở rộng tầm mắt với hàng loạt bộ công cụ và dịch vụ hiện đại bậc nhất hiện nay như AWS Bedrock, Neptune Analytics, AWS Lambda, DynamoDB, LlamaIndex, Docker, và Terraform.

#### Kết nối và trao đổi
- Xuyên suốt sự kiện, đặc biệt ở phần cuối các bài thuyết trình, đều có các chuyên mục hỏi đáp (Q&A) và mã QR để người tham dự có thể kết nối với diễn giả qua mạng xã hội (LinkedIn), tạo không gian giao lưu mạnh mẽ.

#### Bài học rút ra
- Những lời khuyên nghề nghiệp rất sâu sắc đã được rút ra: Kinh nghiệm thực tiễn quan trọng hơn chứng chỉ, chất lượng dữ liệu quyết định sự thành bại của hệ thống học máy, không học quá nhiều thứ cùng lúc mà hãy tập trung đào sâu 1-2 kỹ năng cốt lõi trước, và "dù bạn bắt đầu từ đâu không quan trọng, mọi bước tiến nhỏ đều có giá trị".

#### Một số hình ảnh khi tham gia sự kiện
![Event2](/images/4-Events/Event2.png)
![Event2](/images/4-Events/Event2b.png)
