import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class FeedbackService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async onModuleInit() {
    console.log('✅ FeedbackService initialized');
  }

  // Producer: envia o feedback para o Kafka
  async send(feedback: any) {
    await this.kafkaService.sendFeedback('feedback-submitted', feedback);
  }

  // Consumer: processa feedback recebido do Kafka
  async handleFeedback(feedback: any) {
    try {
      console.log('📥 Received feedback from Kafka:', feedback);

      const entity = this.feedbackRepository.create({
        rating: feedback.rating,
        comment: feedback.comment,
      });

      await this.feedbackRepository.save(entity);
      console.log('✅ Feedback saved to database:', entity);
    } catch (error) {
      console.error('❌ Error processing feedback:', error.message);
    }
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
