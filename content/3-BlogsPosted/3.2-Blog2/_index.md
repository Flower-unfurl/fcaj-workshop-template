---
title: "Blog 2"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.2. </b> "
---

# BUILDING A CONTEXTUAL CHATBOT APPLICATION USING AMAZON BEDROCK KNOWLEDGE BASES

## INTRODUCTION
Modern chatbots provide 24/7 customer support with the ability to simultaneously handle queries in multiple languages. Although using a Large Language Model (LLM) provides natural understanding and response capabilities, if a chatbot can only answer basic questions, its utility is very limited.
To make a Chatbot more reliable, we need to connect it to internal information systems and databases. Integrating this proprietary data enables the chatbot to personalize responses and tailor language to the user's expertise.

## RAG (RETRIEVAL AUGMENTED GENERATION) ARCHITECTURE
The most common way to provide context to an LLM is to use Retrieval Augmented Generation (RAG) architecture. This is a method that combines the text generation power of an LLM with the ability to search and extract factual information from a database.

The RAG workflow consists of two main pipelines:
- Data ingestion: Uses an LLM to create embedding vectors representing the meaning of documents. Documents are chunked and stored as indices in a vector database.
- Text generation: Transforms the user's question into a vector, retrieves the most semantically similar document chunks from the database to supplement context, and then requests the LLM to generate a response based on that context.

Building a RAG system from scratch is highly complex because it requires significant technical expertise to manage the interdependencies between the database, search mechanism, prompt generation, and the generative model. It can consume many weeks of engineering team effort just for optimal setup.

## AMAZON BEDROCK KNOWLEDGE BASES - THE OPTIMAL SERVERLESS SOLUTION
To alleviate this technical burden, Amazon Bedrock Knowledge Bases provides a serverless RAG system that automatically manages both the data ingestion and text generation pipelines.
- The StartIngestionJob API automates document chunking, embedding vector creation, and storage.
- The RetrieveAndGenerate API automatically retrieves relevant information and generates accurate responses.

## CHATBOT SOLUTION ARCHITECTURE OVERVIEW
The process of designing this architecture includes the following steps:
1. The user uploads a dataset to Amazon S3 (serving as the data source).
2. Amazon S3 invokes an AWS Lambda function to sync the data source with the knowledge base via StartIngestionJob.
3. The system chunks the documents, uses the Amazon Titan model to create embeddings, and stores them in the Amazon OpenSearch Serverless vector store.
4. On the user interface, the user asks a question in natural language.
5. The query is sent via Amazon API Gateway to another Lambda function, which calls the RetrieveAndGenerate API.
6. Bedrock uses the Titan model to find semantically similar text and then sends this context along with the question to the Anthropic Claude Instant 1.2 LLM to generate a response. Claude Instant 1.2 was chosen for its speed, affordability, and strong conversational handling capability.
7. Finally, the user receives an answer along with specific citations.

## PREREQUISITES
To set up this solution, you need:
- Request access to the Amazon Titan Embeddings G1 – Text and Claude Instant 1.2 models in Amazon Bedrock.
- Select an AWS Region supported by Amazon Bedrock.
- For local deployment, install and configure AWS CLI, AWS CDK, Node.js 20.x, and Docker.

## DEPLOYING THE SOLUTION
The solution is available in the GitHub repository: https://github.com/aws-samples/amazon-bedrock-rag

Complete the following steps to deploy the solution:
1. From the command line, navigate to the backend directory: cd backend
2. Install the necessary dependencies: npm install
3. Use AWS CDK to deploy the chatbot application backend: cdk deploy --context allowedip="xxx.xxx.xxx.xxx/32"

## CONCLUSION
Through its built-in RAG architecture, Amazon Bedrock Knowledge Bases has thoroughly resolved the operational complexities of an information retrieval system. The result is a superior Chatbot application capable of querying the company's proprietary data, providing highly personalized answers, and being consistently transparent about its information sources. Furthermore, the entire infrastructure architecture of this project is packaged as Infrastructure as Code via AWS CDK, making it easy to deploy, customize, and scale the solution directly on the AWS environment.

![Blog2](/images/3-BlogsPosted/Blog2.png)

[Link to published blog post](https://www.facebook.com/groups/awsstudygroupfcj/posts/2208429953255298/?locale=vi_VN)

[Link to reference documentation](https://aws.amazon.com/vi/blogs/machine-learning/build-a-contextual-chatbot-application-using-knowledge-bases-for-amazon-bedrock/)