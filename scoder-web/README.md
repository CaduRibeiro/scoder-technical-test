# 💻 Scoder Feedback – Frontend

Este módulo representa a interface web do sistema **Scoder Feedback**, desenvolvida com **React + Vite + TailwindCSS**. Permite o envio e visualização de feedbacks em tempo real, integrando com a API NestJS e exibindo os dados paginados do banco MySQL.

---

## 📌 Funcionalidades

- Envio de feedbacks com nota e comentário
- Feedback visual de sucesso ou erro
- Listagem dos feedbacks recebidos com paginação real (via API)
- Estilização moderna com TailwindCSS
- Docker-ready para deploy local ou em nuvem

---

## 📦 Estrutura do diretório

```bash
scoder-web/
├── public/
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── FeedbackForm.tsx
│ │ ├── FeedbackList.tsx
│ │ ├── FeedbackCard.tsx
│ │ └── Loader.tsx
│ ├── services/
│ │ └── api.ts
│ ├── styles/
│ │ └── tokens.css
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ └── main.tsx
├── Dockerfile
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Como executar localmente

> Pré-requisitos: Node.js 18+, npm

```bash
# Instale as dependências
npm install

# Rode o app em modo de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

---

## 🐳 Como rodar com Docker

```bahs
docker build -t scoder-web .
docker run -p 5173:80 scoder-web
```

Ou via docker-compose (recomendado com os outros serviços):

```bash
docker compose up --build
```

---

## 🌐 Integração com a API

A aplicação consome os seguintes endpoints da API:

- `POST /feedback` → Envia um novo feedback
- `GET /feedback?page=1&limit=5` → Retorna feedbacks paginados

Configure a URL da API editando `services/api.ts`:

```bash
const API_URL = "http://localhost:3000"; // ou "http://scoder-api:3000" no Docker
```

---

## 🎨 Estilo e UX

- Utiliza TailwindCSS com tokens reutilizáveis (styles/tokens.css)
- Componente Loader para feedback visual de carregamento
- Animações e responsividade para melhor experiência

---

## ✅ Tecnologias utilizadas

- React
- Vite
- TailwindCSS
- Docker
