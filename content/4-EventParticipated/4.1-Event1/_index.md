---
title: "Event 1"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

# Reflection on "FCAJ Community Day"

### Purpose of the Event

- Share in-depth knowledge and practical experience on Cloud Computing (AWS) and Artificial Intelligence (AI).
- Provide guidance on building, securing, and operating AI applications at enterprise scale, not just as experiments.
- Create a community networking space, update solutions for optimizing AWS CloudFront infrastructure, and inspire through Hackathon competitions.

### Speaker List

- **Duc Dao** - Solution Architect at Cloud Kinetics
- **Vy Lam** - Senior Business Systems Analyst at VPBank
- **Pham Ng Hai Anh** - Cloud Consulting Specialist at G-AsiaPacific Vietnam, AWS Community Builder
- **Nguyen Tuan Thinh** - DevOps Engineer at First Cloud AI Journey
- **Team VIB** - Team participating in LotusHacks 2026
- **Tinh Truong** - Platform Engineer at GoTymeX

### Highlights

#### Non-Determinism of "Deterministic" LLM Settings
- Setting temp = 0 does not guarantee AI will produce 100% identical results.
- The cause is floating-point arithmetic errors on GPUs and the provider's batch processing mechanism.

#### Enterprise-Grade Multi-Agent System
- Explored how to use a Multi-Agent system for credit scoring of startups, replacing single-agent systems that have many limitations such as context window limits and lack of verification. The system includes multiple specialized Agents (Finance, Market, HR, Risk, Compliance) working like a committee, with emphasis on secure deployment and data governance on AWS.

#### AI Assistant with Amazon Q
- Introduced Amazon Q as a unified solution for consolidating company data spaces and automating repetitive tasks.
- This assistant can be applied to roles like Project Management (PM) to automatically generate meeting minutes, send emails, and schedule tasks.

#### CloudFront as Your Foundation
- Solved the AWS service cost problem using Amazon CloudFront (including CDN, WAF, DDoS, DNS).
- Learned about security (Origin cloaking, WAF) and performance optimization (HTTP/3, data compression).

#### UTMorpho Project at LotusHacks 2026
- Experienced 36 hours at LotusHacks to build a tool that converts sketches into interfaces (wireframes).
- Discussed how to handle errors where AI generates excess data and exhausts tokens.

#### Context Is Everything
- Confirmed that AI gives wrong answers usually due to poor context ("Internet Puller").
- 4 steps to communicate effectively with AI: Objective, Relevant Information, Constraints, and Success Criteria.
- Need to build a "Second AI Brain" with curated context rather than dumping all raw data.

### Lessons Learned

#### The Nature of AI
- AI is probabilistic, not entirely deterministic.
- Systems must be designed to accept a margin of error or use a majority voting mechanism.

#### Systems Thinking
- For complex problems requiring multidisciplinary expertise, breaking them down into multiple Agents that cross-check each other (checks & balances) provides far greater reliability and auditability than a single Agent.

#### Security & Cost Optimization
- Use CloudFront to accelerate the web and hide the origin server IP (Origin cloaking).
- CloudFront has edge-level DDoS protection and the ability to switch to a Flat-pricing model to mitigate financial risk.


### Application to Work
- Process architecture: Apply the Multi-Agent model (CrewAI / Bedrock AgentCore) for complex business tasks requiring multidisciplinary expertise.
- Communicating with AI (Prompting): Always provide all 4 elements before giving a command: Objective, Relevant Information, Constraints, and Success Criteria.
- Infrastructure optimization: Enable HTTP compression on CloudFront to reduce payload size by 80%; use the Origin Access Control (OAC) feature to completely block direct internet access to the origin server.

### Experience at the Event

Attending the **"FCAJ Community Day"** workshop was a very rewarding experience, giving me a comprehensive view of how to modernize applications and databases using modern methods and tools. Some notable highlights:

#### Learning from Highly Experienced Speakers
- Got access to enterprise-scale thinking from Solution Architects and DevOps engineers, understanding that AI work is not just about running code but also about security, data governance, and operations.

#### Hands-on Technical Experience
- Watched real deployment flows (from local to AWS Cloud) via ECR, Lambda, API Gateway, and Amazon Bedrock, and gained a clear understanding of the underlying GPU mathematics that cause AI errors.

#### Application of Modern Tools
- Expanded my awareness of the current ecosystem of tools such as Amazon Q, AWS WAF/Shield for DDoS protection, and HTTP/3 (QUIC) structure.
- Learned about the design process for a tool that converts wireframes into code using Claude.

#### Networking and Exchange
- Met and connected with members of the AWS community, gaining extra inspiration to continue learning and growing.
- Felt the spirit of teamwork and pushing personal limits through the story of the VIB team's 36-hour hackathon, as well as the open and sharing spirit of the AWS community.

#### Takeaways
- The future is not a battle between humans and AI, but rather a difference between those who know how to work with AI and those who don't.
- Mastering context and having strong systems design thinking is the key to transforming AI from an entertainment tool into a machine that generates real ROI (return on investment) in a production environment.

#### Some photos from the event
![Event1](/images/4-Events/Event1a.png)
![Event1](/images/4-Events/Event1b.png)

