# Etapa 1: build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY wait-for.sh .
COPY start.sh .

RUN npm install --only=production && chmod +x wait-for.sh start.sh

EXPOSE 3000

CMD ["sh", "./start.sh"]
