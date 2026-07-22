---
title: "Event 1"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

# Bài thu hoạch “FCAJ Community Day”

### Mục Đích Của Sự Kiện

- Chia sẻ kiến thức chuyên sâu và kinh nghiệm thực tiễn về Điện toán đám mây (AWS) và Trí tuệ nhân tạo (AI)
- Hướng dẫn cách xây dựng, bảo mật và vận hành các ứng dụng AI ở quy mô doanh nghiệp thay vì chỉ thử nghiệm
- Tạo không gian kết nối cộng đồng, cập nhật giải pháp tối ưu hóa hạ tầng AWS CloudFront và truyền cảm hứng qua các cuộc thi Hackathon

### Danh Sách Diễn Giả

- **Duc Dao** - Solution Architect tại Cloud Kinetics
- **Vy Lam** - Senior Business Systems Analyst tại VPBank
- **Pham Ng Hai Anh** - Chuyên gia tư vấn Cloud tại G-AsiaPacific Vietnam, AWS Community Builder
- **Nguyen Tuan Thinh** - DevOps Engineer tại First Cloud AI Journey
- **Team VIB** - Nhóm tham gia cuộc thi LotusHacks 2026
- **Tinh Truong** - Platform Engineer tại GoTymeX

### Nội Dung Nổi Bật

#### Non-Determinism of "Deterministic" LLM Settings
- Cấu hình temp = 0 không đảm bảo AI tạo ra kết quả giống nhau 100%
- Nguyên nhân là do sai số phép toán dấu phẩy động trên GPU và cơ chế gộp batch của nhà cung cấp

#### Enterprise-Grade Multi-Agent System
- Khai thác cách dùng hệ thống đa tác vụ (Multi-Agent) để chấm điểm tín dụng cho startup, thay thế cho hệ thống một tác vụ vốn có nhiều hạn chế như giới hạn ngữ cảnh và thiếu sự kiểm chứng. Hệ thống bao gồm nhiều Agent chuyên biệt (Tài chính, Thị trường, Nhân sự, Rủi ro, Tuân thủ) làm việc như một hội đồng và nhấn mạnh việc triển khai bảo mật, quản trị dữ liệu trên AWS

#### Trợ lý AI với Amazon Q
- Giới thiệu Amazon Q như một giải pháp hợp nhất không gian dữ liệu công ty và tự động hóa các tác vụ lặp đi lặp lại
- Trợ lý này có thể được ứng dụng cho các vai trò như Quản lý dự án (PM) để tự động tạo biên bản cuộc họp, gửi email và lên lịch

#### CloudFront as Your Foundation
- Giải quyết bài toán chi phí sử dụng dịch vụ AWS bằng Amazon CloudFront (bao gồm CDN, WAF, DDoS, DNS)
- Tìm hiểu về bảo mật (Origin cloaking, WAF) và tối ưu hiệu suất (HTTP/3, nén dữ liệu)

#### Dự án UTMorpho tại LotusHacks 2026
- Trải nghiệm 36 giờ tại LotusHacks để xây dựng công cụ biến bản phác thảo thành giao diện (wireframe)
- Nêu cách xử lý lỗi AI sinh dữ liệu thừa và cạn kiệt token

#### Context Is Everything
- Khẳng định AI trả lời sai thường do ngữ cảnh kém ("Internet Puller")
- 4 bước để giao tiếp với AI: Mục tiêu, Thông tin liên quan, Ràng buộc, và Tiêu chí thành công
- Cần xây dựng "Second AI Brain" với ngữ cảnh được chắt lọc thay vì nhồi nhét toàn bộ dữ liệu

### Những Gì Học Được

#### Bản chất của AI
- AI mang tính xác suất, không hoàn toàn tất định
- Cần thiết kế hệ thống chấp nhận sự sai số hoặc dùng cơ chế majority voting

#### Tư duy Hệ thống
- Đối với các bài toán phức tạp đòi hỏi chuyên môn đa ngành, việc chia nhỏ thành nhiều Agent để chúng tự kiểm tra chéo (checks & balances) mang lại độ tin cậy và khả năng kiểm toán cao hơn hẳn so với một Agent

#### Bảo mật & Tối ưu chi phí
- Dùng CloudFront để tăng tốc web,ẩn IP máy chủ gốc (Origin cloaking)
- CloudFront có khả năng phòng chống DDoS ở biên và chuyển sang mô hình Flat-pricing để tránh rủi ro tài chính


### Ứng Dụng Vào Công Việc
- Kiến trúc quy trình: Áp dụng mô hình Multi-Agent (CrewAI / Bedrock AgentCore) cho các nghiệp vụ phức tạp cần chuyên môn đa ngành
- Giao tiếp với AI (Prompting): Luôn cung cấp đủ 4 yếu tố trước khi ra lệnh: Mục tiêu, Thông tin liên quan, Ràng buộc, và Tiêu chí thành công
- Tối ưu Hạ tầng: Bật nén HTTP trên CloudFront để giảm 80% dung lượng tải; dùng tính năng Origin Access Control (OAC) để chặn hoàn toàn truy cập trực tiếp từ Internet vào máy chủ gốc

### Trải nghiệm trong event

Tham gia workshop **“FCAJ Community Day”** là một trải nghiệm rất bổ ích, giúp tôi có cái nhìn toàn diện về cách hiện đại hóa ứng dụng và cơ sở dữ liệu bằng các phương pháp và công cụ hiện đại. Một số trải nghiệm nổi bật:

#### Học hỏi từ các diễn giả có chuyên môn cao
- Được tiếp cận với tư duy Quy mô doanh nghiệp từ các Solution Architect và DevOps, hiểu rằng làm AI không chỉ là chạy được code mà còn là bảo mật, quản trị dữ liệu và vận hành

#### Trải nghiệm kỹ thuật thực tế
- Được xem các luồng triển khai (deployment flow) thực tế từ local lên AWS Cloud thông qua ECR, Lambda, API Gateway và Amazon Bedrock, cũng như hiểu rõ cơ chế toán học bên dưới GPU khiến AI sinh ra lỗi

#### Ứng dụng công cụ hiện đại
- Mở rộng tầm nhìn về hệ sinh thái công cụ hiện tại như Amazon Q, AWS WAF/Shield để chống DDoS, cấu trúc HTTP/3 (QUIC) 
- Tìm hiểu về quy trình thiết kế công cụ biến bản vẽ thành code bằng Claude

#### Kết nối và trao đổi
- Gặp gỡ và giao lưu với các anh em trong cộng đồng AWS, được truyền thêm cảm hứng để tiếp tục học hỏi và phát triển bản thân.
- Cảm nhận được tinh thần làm việc nhóm và vượt qua giới hạn bản thân thông qua câu chuyện hackathon 36 giờ của team VIB, cũng như tinh thần chia sẻ cởi mở của cộng đồng AWS

#### Bài học rút ra
- Tương lai không phải là cuộc chiến giữa con người và AI, mà là sự khác biệt giữa những người biết cách làm việc với AI so với những người không biết
- Việc làm chủ ngữ cảnh và có tư duy thiết kế hệ thống tốt chính là chìa khóa để biến AI từ một công cụ giải trí thành một cỗ máy mang lại ROI (tỷ suất hoàn vốn) thực sự trong môi trường sản xuất

#### Một số hình ảnh khi tham gia sự kiện
![Event1](/images/4-Events/Event1a.png)
![Event1](/images/4-Events/Event1b.png)

