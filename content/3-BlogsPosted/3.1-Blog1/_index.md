---
title: "Blog 1"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# OPTIMIZING LAKEHOUSE ARCHITECTURE WITH AMAZON SAGEMAKER

## INTRODUCTION
In today's era of data explosion, organizations often face a difficult choice between two models: the Data Lake and the Data Warehouse. While a Data Lake (like Amazon S3) offers superior flexibility by supporting multiple formats and multi-tool access, a Data Warehouse (like Amazon Redshift) excels in optimal performance and ACID compliance.
However, maintaining two separate systems often creates data silos and increases operational costs. The Lakehouse architecture emerged as a unified solution, combining the strengths of both models on an open platform. With the next generation of Amazon SageMaker, AWS provides an integrated experience for analytics and AI, enabling businesses to build a reliable, centralized data repository without having to trade off between flexibility and performance.

## KEY POINTS SUMMARY
The 4 foundational components of SageMaker Lakehouse:
  - Flexible storage: Ability to adapt to various types of workloads.
  - Technical Catalog: Uses AWS Glue Data Catalog as a centralized metadata management source.
  - Access governance: Integrates with AWS Lake Formation for fine-grained permission control down to the row, column, and cell level.
  - Open access framework: Based on Apache Iceberg REST APIs to ensure broad compatibility with open-source tools.

Flexible data integration methods (depending on latency requirements and system complexity, businesses can choose):
  - Traditional ETL: For complex transformations and large-scale data normalization requirements.
  - Zero-ETL: Automatically and continuously replicates data from source to the Lakehouse via a CDC (Change Data Capture) mechanism, minimizing errors and accelerating processing.
  - Data Federation: A "query-in-place" method that moves no data, saving storage costs and suitable for immediate analytics needs.

Choosing the optimal storage layer based on requirements (this architecture allows flexible configuration of where to store data based on strict performance requirements):
  - S3 with self-managed Iceberg: Provides maximum control over the data lifecycle and maintenance tasks.
  - S3 Tables: A fully optimized option for the Apache Iceberg format, automatically handling tasks like file compaction and data cleanup, allowing engineering teams to focus on extracting value rather than managing infrastructure.
  - Redshift Managed Storage (RMS): The preferred choice for high-priority BI reports requiring complex queries with ultra-low latency and high concurrency.

Catalog governance (Managed & Federated): SageMaker supports both a Managed Catalog (where metadata is managed directly by the Lakehouse) and a Federated Catalog (connecting to external sources like Snowflake or DynamoDB without moving data). This is particularly useful when needing to integrate existing data investments into a unified governance framework.

## CONCLUSION
Building a Lakehouse architecture is not simply a matter of choosing between a data lake or a data warehouse. It is a strategy for interoperability, where both solution frameworks coexist and complement each other in a unified data ecosystem.
By leveraging Amazon SageMaker together with open table formats like Apache Iceberg, businesses can build highly scalable, high-performance data systems that are ready for future AI/Machine Learning applications. Understanding storage models and data integration methods is the key to optimizing both cost and operational efficiency for your organization.

![Blog1](/images/3-BlogsPosted/Blog1.png)

[Link to published blog post](https://www.facebook.com/groups/awsstudygroupfcj/posts/2195960164502277/?locale=vi_VN)

[Link to reference documentation](https://aws.amazon.com/blogs/big-data/navigating-architectural-choices-for-a-lakehouse-using-amazon-sagemaker/)