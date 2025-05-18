import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'scoder-feedback-producer',
      brokers: ['kafka:9092'],
    });

    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async sendFeedback(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`✅ Sent message to topic "${topic}":`, message);
    } catch (error) {
      console.error(`❌ Error sending message to Kafka:`, error);
      throw error;
    }
  }
}
