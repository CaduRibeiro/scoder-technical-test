import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { HttpException } from '@nestjs/common';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  const mockFeedbackService = {
    findAll: jest
      .fn()
      .mockResolvedValue([
        { id: 1, rating: 5, comment: 'Ótimo!', createdAt: new Date() },
      ]),
    send: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: mockFeedbackService,
        },
      ],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should return all feedbacks', async () => {
    const result = await controller.getAll();
    expect(result).toHaveLength(1);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should send valid feedback', async () => {
    const body = { rating: 4, comment: 'Bom' };
    const response = await controller.sendFeedback(body);

    expect(service.send).toHaveBeenCalledWith(
      expect.objectContaining({
        rating: 4,
        comment: 'Bom',
      }),
    );

    expect(response).toHaveProperty('status', 'Message sent to Kafka');
  });

  it('should reject invalid rating', async () => {
    const body = { rating: 7, comment: 'Invalido' };

    await expect(controller.sendFeedback(body)).rejects.toThrow(HttpException);
  });
});
