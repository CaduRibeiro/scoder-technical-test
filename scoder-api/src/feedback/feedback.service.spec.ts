import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { KafkaService } from '../kafka/kafka.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feedback } from '../feedback/feedback.entity';
import { Repository } from 'typeorm';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let kafkaService: KafkaService;
  let feedbackRepo: Repository<Feedback>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: KafkaService,
          useValue: { sendFeedback: jest.fn() },
        },
        {
          provide: getRepositoryToken(Feedback),
          useValue: {
            create: jest.fn().mockImplementation((f) => f),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    kafkaService = module.get<KafkaService>(KafkaService);
    feedbackRepo = module.get<Repository<Feedback>>(
      getRepositoryToken(Feedback),
    );
  });

  it('should send feedback to Kafka', async () => {
    const feedback = { rating: 5, comment: 'Teste' };
    await service.send(feedback);
    expect(kafkaService.sendFeedback).toHaveBeenCalledWith(
      'feedback-submitted',
      feedback,
    );
  });

  it('should save feedback to the database', async () => {
    const feedback = { rating: 4, comment: 'Ok' };
    await service.handleFeedback(feedback);
    expect(feedbackRepo.create).toHaveBeenCalledWith(feedback);
    expect(feedbackRepo.save).toHaveBeenCalledWith(feedback);
  });

  it('should find all feedbacks', async () => {
    await service.findAll();
    expect(feedbackRepo.find).toHaveBeenCalledWith({
      order: { createdAt: 'DESC' },
    });
  });
});
