---
title: "Blog 2"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.2. </b> "
---

# XÂY DỰNG ỨNG DỤNG CHATBOT THEO NGỮ CẢNH BẰNG AMAZON BEDROCK KNOWLEDGE BASES

## MỞ ĐẦU
Các chatbot hiện đại cung cấp dịch vụ hỗ trợ khách hàng 24/7 với khả năng xử lý đồng thời nhiều truy vấn bằng nhiều ngôn ngữ khác nhau. Mặc dù sử dụng Mô hình ngôn ngữ lớn (LLM) mang lại khả năng hiểu và phản hồi tự nhiên, nhưng nếu chatbot chỉ trả lời được các câu hỏi cơ bản thì tiện ích mang lại sẽ rất hạn chế.
Để biến Chatbot nên đáng tin cậy hơn, chúng ta cần kết nối nó với các hệ thống thông tin và cơ sở dữ liệu nội bộ. Việc tích hợp dữ liệu độc quyền này giúp chatbot cá nhân hóa phản hồi, điều chỉnh ngôn ngữ cho phù hợp với chuyên môn của người dùng.

## KIẾN TRÚC RAG (RETRIEVAL AUGMENTED GENERATION)
Cách phổ biến nhất để mang lại ngữ cảnh cho LLM là sử dụng kiến trúc Retrieval Augmented Generation (RAG). Đây là phương pháp kết hợp sức mạnh tạo văn bản của LLM với khả năng tìm kiếm và trích xuất thông tin thực tế từ cơ sở dữ liệu.

Quy trình RAG bao gồm hai luồng công việc chính:
- Đưa dữ liệu vào: Sử dụng LLM để tạo các vector nhúng đại diện cho ý nghĩa của tài liệu. Các tài liệu được chia nhỏ và lưu dưới dạng index trong cơ sở dữ liệu vector.
- Tạo văn bản: Biến đổi câu hỏi của người dùng thành vector, truy xuất các đoạn tài liệu tương đồng nhất từ cơ sở dữ liệu để bổ sung ngữ cảnh, sau đó yêu cầu LLM tạo ra câu trả lời dựa trên ngữ cảnh đó.

Việc tự xây dựng hệ thống RAG rất phức tạp vì đòi hỏi kỹ thuật cao để quản lý sự phụ thuộc giữa database, cơ chế tìm kiếm, tạo prompt và mô hình generative. Nó có thể tiêu tốn nhiều tuần của đội ngũ kỹ sư chỉ để thiết lập tối ưu.

## AMAZON BEDROCK KNOWLEDGE BASES - GIẢI PHÁP SERVERLESS TỐI ƯU
Nhằm giảm tải gánh nặng kỹ thuật, Amazon Bedrock Knowledge Bases cung cấp một hệ thống RAG dạng serverless, quản lý tự động cả luồng đưa dữ liệu vào lẫn tạo văn bản.
- API StartIngestionJob tự động hóa việc chia nhỏ tài liệu, tạo vector nhúng và lưu trữ.
- API RetrieveAndGenerate tự động truy xuất các thông tin liên quan và tạo ra phản hồi chính xác.

## TỔNG QUAN VỀ KIẾN TRÚC GIẢI PHÁP CHATBOT
Quy trình thiết kế kiến trúc này bao gồm các bước sau:
1. Người dùng tải bộ dữ liệu lên Amazon S3 (đóng vai trò nguồn dữ liệu).
2. Amazon S3 gọi một hàm AWS Lambda để đồng bộ nguồn dữ liệu với knowledge base thông qua StartIngestionJob.
3. Hệ thống chia nhỏ tài liệu, sử dụng mô hình Amazon Titan để tạo embeddings và lưu vào kho lưu trữ vector Amazon OpenSearch Serverless.
4. Ở giao diện người dùng, người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên.
5. Truy vấn được gửi qua Amazon API Gateway tới một hàm Lambda khác, hàm này sẽ gọi API RetrieveAndGenerate.
6. Bedrock dùng mô hình Titan để tìm kiếm văn bản tương tự và sau đó gửi ngữ cảnh này cùng câu hỏi tới LLM Anthropic Claude Instant 1.2 để sinh ra phản hồi. Claude Instant 1.2 được chọn vì tốc độ nhanh, giá thành hợp lý và khả năng xử lý hội thoại tốt.
7. Cuối cùng, người dùng nhận được câu trả lời kèm theo trích dẫn cụ thể.

## ĐIỀU KIỆN TIÊN QUYẾT
Để thiết lập giải pháp này, bạn cần:
Yêu cầu quyền truy cập vào các mô hình Amazon Titan Embeddings G1 – Text và Claude Instant 1.2 trong Amazon Bedrock.
Chọn một AWS Region mà Amazon Bedrock hỗ trợ.
Để triển khai từ máy cục bộ, cần cài đặt và thiết lập AWS CLI, cài đặt AWS CDK, Node.js 20.x, và Docker.

## TRIỂN KHAI GIẢI PHÁP
Giải pháp có sẵn trong kho lưu trữ GitHub: https://github.com/aws-samples/amazon-bedrock-rag

Hoàn thành các bước sau để triển khai giải pháp:
1. Từ dòng lệnh, điều hướng đến thư mục backend bằng lệnh: cd backend
2. Cài đặt các thư viện cần thiết bằng lệnh: npm install
3. Sử dụng AWS CDK để triển khai phần phụ trợ của ứng dụng chatbot bằng lệnh: cdk deploy --context allowedip="xxx.xxx.xxx.xxx/32"

## KẾT LUẬN
Thông qua kiến trúc RAG tích hợp sẵn, Amazon Bedrock Knowledge Bases đã giải quyết triệt để những phức tạp về vận hành hệ thống truy xuất thông tin. Kết quả mang lại là ứng dụng Chatbot vượt trội, có khả năng tra cứu dữ liệu độc quyền của công ty, cung cấp câu trả lời có tính cá nhân hóa cao và luôn minh bạch về nguồn gốc thông tin. Hơn nữa, toàn bộ kiến trúc hạ tầng của dự án này đều được đóng gói dưới dạng Infrastructure as Code (Mã hóa cơ sở hạ tầng) thông qua AWS CDK, giúp dễ dàng triển khai, tùy chỉnh và nhân rộng giải pháp ngay trên môi trường AWS.

![Blog2](/images/3-BlogsPosted/Blog2.png)

[Link bài blog đã đăng](https://www.facebook.com/groups/awsstudygroupfcj/posts/2208429953255298/?locale=vi_VN)

[Link tài liệu tham khảo](https://aws.amazon.com/vi/blogs/machine-learning/build-a-contextual-chatbot-application-using-knowledge-bases-for-amazon-bedrock/)