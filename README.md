# Scoder Feedback – Infrastructure as Code (IaC)

This project defines the cloud infrastructure for the _Scoder Feedback_ system using **AWS CDK with TypeScript**. It demonstrates the ability to provision a secure, scalable, and observable environment for a distributed application using Infrastructure as Code.

---

## 📌 Project Overview

The infrastructure supports a containerized backend application built with NestJS and designed to work with Kafka and a MySQL database. The system includes:

- A Virtual Private Cloud (VPC) with public and private subnets across two availability zones
- An ECS cluster running a Fargate service to host the backend API
- An Application Load Balancer (ALB) to handle incoming HTTP requests
- An Amazon RDS instance (MySQL) for persistent data storage
- Secrets Manager for secure management of database credentials
- Auto-scaling configuration based on CPU utilization

---

## ✅ Functionalities

- Provisioning of a full production-ready environment using AWS CDK
- Secure communication between services inside a private network
- Load balancing and horizontal auto-scaling for ECS containers
- Automatic generation and storage of database credentials
- Integration-ready for Kafka and NestJS-based microservices

---

## 🚀 How to Deploy

### 1. Prerequisites

Ensure the following tools are installed and configured:

- [Node.js](https://nodejs.org/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/)
- Docker (for container image creation and testing)
- AWS account and credentials configured via `aws configure`

### 2. Install dependencies

From the `scoder-iac/` directory, run:

```bash
npm install
```

```bash
npm run build
```

```bash
cdk deploy
```

This will create all AWS resources defined in the CDK stack.

---

### Notes

- The default container image is node:18. Replace it with your application image from Docker Hub.
- The RDS instance is created with deletion enabled and is not publicly accessible.
- Secrets are generated and stored securely in AWS Secrets Manager.

## 📁 Directory Structure

```
scoder-iac/
├── bin/
│   └── scoder-iac.ts
├── lib/
│   └── scoder-iac-stack.ts
├── package.json
├── cdk.json
└── README.md
```
