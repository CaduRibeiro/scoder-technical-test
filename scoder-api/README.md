# ⚙️ Scoder API – Feedback Service (NestJS + Kafka + MySQL)

Este serviço backend faz parte do sistema Scoder Feedback. Ele é responsável por receber, validar, processar e armazenar feedbacks enviados pelos usuários. A arquitetura é orientada a eventos, utilizando Kafka como mensageria e MySQL como banco de dados relacional.

---

## ✅ Funcionalidades

- Recebimento de feedbacks via API REST
- Validação de dados (rating entre 1 e 5)
- Envio dos dados para Kafka (`feedback-submitted`)
- Consumo assíncrono do tópico Kafka
- Persistência no banco de dados (MySQL via TypeORM)
- Testes automatizados com Jest

---

## 🔌 Endpoints

### `POST /feedback`

Envia um novo feedback (assíncrono via Kafka)

**Body JSON:**

```json
{
  "rating": 5,
  "comment": "Excelente!"
}
```

**Response**

```json
{
  "status": "Message sent to Kafka",
  "feedback": {
    "rating": 5,
    "comment": "Excelente!",
    "timestamp": "2025-05-18T20:00:57.570Z"
  }
}
```

### `GET /feedback`

Retorna todos os feedbacks persistidos no banco (ordenados por data decrescente).

**Response**

```json
[
  {
    "id": 1,
    "rating": 5,
    "comment": "Excelente!",
    "createdAt": "2025-05-18T20:00:57.570Z"
  }
]
```

---

## 🧠 Arquitetura

- NestJS com módulos separados (`feedback`, `kafka`)
- KafkaJS para integração com Apache Kafka
- TypeORM para persistência no MySQL
- Separação entre **producer** e **consumer** Kafka
- KafkaController com `@MessagePattern` para escuta do tópico

---

## 🔧 Variáveis de ambiente (.env)

```bash env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=feedback_db

KAFKA_BROKER=localhost:9092
```

**Observação**: se estiver usando Docker Compose, os hosts devem ser mysql e kafka.

---

## 🧪 Testes automatizados

Rodando com Jest, os testes cobrem:

- `FeedbackService`: envio para Kafka, persistência e leitura
- `FeedbackController`: validação e rotas REST

### Rodar os testes:

```bash env
npm run test
```

O Kafka e MySQL são **mockados** nos testes — sem dependência externa.

---

## 🐳 Executar com Docker Compose

```bash
docker compose up --build -d
```

O serviço `scoder-api` será exposto na porta `3000`.

---

## 📁 Estrutura

```bash
scoder-api/
├── src/
│   ├── feedback/
│   │   ├── feedback.controller.ts
│   │   ├── feedback.service.ts
│   │   ├── feedback.module.ts
│   │   ├── feedback.entity.ts
│   │   └── *.spec.ts
│   ├── kafka/
│   │   ├── kafka.service.ts
│   │   ├── kafka.controller.ts
│   │   └── kafka.module.ts
│   └── app.module.ts
├── .env
├── Dockerfile
└── README.md

```
