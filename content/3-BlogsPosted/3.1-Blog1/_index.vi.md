---
title: "Blog 1"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# TỐI ƯU HÓA KIẾN TRÚC LAKEHOUSE VỚI AMAZON SAGEMAKER

## PHẦN MỞ ĐẦU
Trong bối cảnh dữ liệu bùng nổ hiện nay, các tổ chức thường phải đối mặt với sự lựa chọn khó khăn giữa hai mô hình: Data Lake (Hồ dữ liệu) và Data Warehouse (Kho dữ liệu). Trong khi Data Lake (như Amazon S3) mang lại sự linh hoạt vượt trội với khả năng hỗ trợ nhiều định dạng và truy cập đa công cụ, thì Data Warehouse (như Amazon Redshift) lại chiếm ưu thế về hiệu suất tối ưu và tính tuân thủ ACID.
Tuy nhiên, việc duy trì hai hệ thống tách biệt thường tạo ra các rào cản về dữ liệu và tăng chi phí vận hành. Kiến trúc Lakehouse ra đời như một giải pháp hợp nhất, kết hợp sức mạnh của cả hai mô hình trên một nền tảng mở. Với thế hệ tiếp theo của Amazon SageMaker, AWS cung cấp một trải nghiệm tích hợp cho phân tích và AI, cho phép doanh nghiệp xây dựng một kho dữ liệu tập trung đáng tin cậy mà không cần phải đánh đổi giữa tính linh hoạt và hiệu suất.

## TÓM TẮT CÁC ĐIỂM CHÍNH
4 thành phần nền tảng của SageMaker Lakehouse:
  - Lưu trữ linh hoạt: Khả năng thích ứng với nhiều loại tải công việc khác nhau.
  - Danh mục kỹ thuật (Technical Catalog): Sử dụng AWS Glue Data Catalog làm nguồn quản lý siêu dữ liệu tập trung.
  - Quản trị quyền truy cập: Tích hợp với AWS Lake Formation để kiểm soát quyền chi tiết đến từng dòng, cột và ô.
  - Khung truy cập mở: Dựa trên các API của Apache Iceberg REST để đảm bảo khả năng tương thích rộng rãi với các công cụ nguồn mở.

Các phương thức tích hợp dữ liệu linh hoạt ( Tùy thuộc vào nhu cầu về độ trễ và độ phức tạp của hệ thống, doanh nghiệp có thể lựa chọn) :
  - ETL truyền thống: Dành cho các biến đổi phức tạp và yêu cầu chuẩn hóa dữ liệu quy mô lớn.
  - Zero-ETL: Tự động sao chép dữ liệu liên tục từ nguồn sang Lakehouse thông qua cơ chế CDC (Change Data Capture), giúp giảm thiểu sai sót và tăng tốc độ xử lý.
  - Data Federation: Phương pháp "truy vấn tại chỗ" không di chuyển dữ liệu, giúp tiết kiệm chi phí lưu trữ và phù hợp cho các nhu cầu phân tích tức thời.

Lựa chọn lớp lưu trữ tối ưu theo nhu cầu (Kiến trúc này cho phép bạn linh hoạt cấu hình nơi lưu trữ dựa trên yêu cầu khắt khe về hiệu năng):
  - S3 với Iceberg tự quản lý: Mang lại quyền kiểm soát tối đa đối với vòng đời dữ liệu và các tác vụ bảo trì.
  - S3 Tables: Một tùy chọn được tối ưu hóa hoàn toàn cho định dạng Apache Iceberg, tự động xử lý các tác vụ như nén file (compaction) và dọn dẹp dữ liệu, giúp đội ngũ kỹ thuật tập trung vào việc khai thác giá trị thay vì quản lý hạ tầng.
  - Redshift Managed Storage (RMS): Lựa chọn ưu tiên cho các báo cáo BI có độ ưu tiên cao, yêu cầu truy vấn phức tạp với độ trễ cực thấp và tính đồng thời cao.

Quản trị qua Catalog (Managed & Federated): SageMaker hỗ trợ cả Managed Catalog (khi siêu dữ liệu được quản lý trực tiếp bởi Lakehouse) và Federated Catalog (kết nối với các nguồn ngoài như Snowflake, DynamoDB mà không cần di chuyển dữ liệu). Điều này đặc biệt hữu ích khi cần tích hợp các khoản đầu tư dữ liệu hiện có vào một khung quản trị thống nhất.

## KẾT LUẬN
Xây dựng kiến trúc Lakehouse không đơn thuần là việc lựa chọn giữa hồ dữ liệu hay kho dữ liệu. Đó là một chiến lược về khả năng tương tác, nơi cả hai khung giải pháp cùng tồn tại và bổ trợ cho nhau trong một hệ sinh thái dữ liệu hợp nhất.
Bằng cách tận dụng Amazon SageMaker cùng các định dạng bảng mở như Apache Iceberg, doanh nghiệp có thể xây dựng những hệ thống dữ liệu có khả năng mở rộng cao, hiệu suất mạnh mẽ và sẵn sàng cho các ứng dụng AI/Machine Learning trong tương lai. Việc hiểu rõ các mô hình lưu trữ và phương thức tích hợp dữ liệu sẽ là chìa khóa để bạn tối ưu hóa cả về chi phí lẫn hiệu quả vận hành cho tổ chức của mình.

![Blog1](/images/3-BlogsPosted/Blog1.png)

[Link bài blog đã đăng](https://www.facebook.com/groups/awsstudygroupfcj/posts/2195960164502277/?locale=vi_VN)

[Link tài liệu tham khảo](https://aws.amazon.com/blogs/big-data/navigating-architectural-choices-for-a-lakehouse-using-amazon-sagemaker/)