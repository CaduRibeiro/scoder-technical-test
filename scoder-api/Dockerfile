# Etapa 1: build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
