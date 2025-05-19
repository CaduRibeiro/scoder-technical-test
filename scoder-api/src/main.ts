import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'scoder-feedback-consumer',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'feedback-group',
      },
    },
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
