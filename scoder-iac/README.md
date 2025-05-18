# 🏗️ Infraestrutura como Código – Scoder Feedback (AWS CDK)

Este módulo define toda a infraestrutura necessária para a aplicação **Scoder Feedback**, utilizando o **AWS CDK com TypeScript**. Ele provisiona recursos em nuvem de forma automatizada e versionável, seguindo boas práticas de segurança, escalabilidade e organização.

---

## ✅ Recursos provisionados

- VPC com subnets públicas e privadas em 2 zonas de disponibilidade
- ECS Fargate com Application Load Balancer (ALB)
- Banco de dados RDS MySQL com credenciais seguras (Secrets Manager)
- Auto-scaling do serviço baseado em uso de CPU
- Integração entre ECS e RDS com controle de acesso
- Docker image configurável para sua aplicação NestJS

---

## 📦 Estrutura do diretório

```
scoder-iac/
├── bin/
│ └── scoder-iac.ts # Arquivo de entrada do CDK
├── lib/
│ └── scoder-iac-stack.ts # Definição principal da infraestrutura
├── test/
│ └── scoder-iac-stack.test.ts # Testes com Jest e assertions do CDK
├── package.json
├── tsconfig.json
├── jest.config.js
├── cdk.json
└── README.md
```

---

## ⚙️ Pré-requisitos

- Node.js
- AWS CLI configurada (`aws configure`)
- AWS CDK instalado globalmente:

```bash
npm install -g aws-cdk
```

---

##🚀 Como executar

1. Instale as dependências:

```bash
npm install
```

2. Compile o projeto:

```bash
npm run build
```

3. Faça o deploy para sua conta AWS:

```bash
cdk deploy
```

O comando criará todos os recursos na nuvem. Pode levar alguns minutos no primeiro deploy.

---

## 🧪 Testes automatizados

Este módulo inclui testes automatizados com Jest e o utilitário Template do CDK para garantir que os recursos foram definidos corretamente.

### ✔️ O que é testado:

- Criação de VPC, ECS Cluster, RDS, ALB
- Configuração de auto scaling com uso de CPU
- Snapshot da infraestrutura para rastrear mudanças futuras

### ▶️ Rodar os testes:

```bash
npm run test
```

### 🔁 Atualizar snapshot (caso necessário):

```bash
npm run test -- -u
```

---

## 🔐 Observações

- A senha do banco de dados é gerada e armazenada no **AWS Secrets Manager**
- O serviço ECS é exposto publicamente via ALB (porta 80)
- O banco RDS **não é acessível publicamente**, apenas dentro da VPC
- Os recursos têm `removalPolicy: DESTROY` apenas para fins de teste (use com cuidado em produção)
- Troque a imagem node:18 no Fargate por sua aplicação dockerizada
- Os nomes dos tópicos Kafka e outras configurações do backend devem ser gerenciados via variáveis de ambiente

---
