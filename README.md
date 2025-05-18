# 🧪 Scoder Technical Test – Fullstack Event-Driven System

Este projeto é um desafio técnico para a empresa **Scoder**, com foco em demonstrar habilidades práticas em:

- 🏗️ Infraestrutura como Código (IaC) com AWS CDK
- ⚙️ Backend assíncrono com NestJS e Kafka
- 💻 Frontend moderno com React, Tailwind e TypeScript

---

## 📦 Estrutura do projeto

```
scoder-technical-test/
├── scoder-iac/ # Infraestrutura AWS CDK (ECS, RDS, ALB, etc.)
├── scoder-api/ # Backend com NestJS, Kafka e MySQL
└── scoder-web/ # Frontend (React + Tailwind)
```

---

## 🎯 Funcionalidades principais

- Envio e processamento assíncrono de feedbacks via Kafka
- Armazenamento dos feedbacks em banco MySQL
- Visualização dos feedbacks no frontend em tempo real
- Infraestrutura automatizada e escalável na AWS

---

## 🚀 Como rodar localmente (usando Docker)

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/scoder-technical-test.git
cd scoder-technical-test
```

2. Suba todos os serviços com:

```bash
docker compose up --build -d
```

3. Acesse os serviços:

| Serviço        | URL                           |
| -------------- | ----------------------------- |
| Frontend React | http://localhost:5173         |
| API NestJS     | http://localhost:3000         |
| MySQL          | localhost:3306 (usuário root) |

---

## 📁 Documentação por módulo

- 📘 [Infraestrutura (CDK)](./scoder-iac/README.md)
- ⚙️ [Backend (NestJS + Kafka)](./scoder-api/README.md)
- 💻 [Frontend (React + Tailwind)](./scoder-web/README.md)

---

## ✅ Tecnologias utilizadas

- AWS CDK (TypeScript)
- ECS Fargate, RDS (MySQL), Secrets Manager
- NestJS, Kafka, TypeORM
- React + Vite + TailwindCSS
- Docker e Docker Compose

---

## 🧠 Observações

- A arquitetura segue o padrão de microsserviços orientado a eventos
- O código está estruturado para facilitar manutenção e escalabilidade
- Todos os módulos possuem README detalhado com instruções específicas

---

## ✍️ Autor

Desenvolvido por Carlos Eduardo Ribeiro
Desafio técnico para a empresa Scoder (2025)
