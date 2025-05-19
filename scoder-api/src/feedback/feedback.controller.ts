import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async getPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<{
    data: Feedback[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    return this.feedbackService.findPaginated(+page, +limit);
  }

  @Post()
  async sendFeedback(@Body() body: any) {
    try {
      const { rating, comment } = body;

      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        throw new HttpException(
          'Rating must be between 1 and 5',
          HttpStatus.BAD_REQUEST,
        );
      }

      const feedback = {
        rating,
        comment: comment || '',
        timestamp: new Date().toISOString(),
      };

      await this.feedbackService.send(feedback);
      return { status: 'Message sent to Kafka', feedback };
    } catch (err) {
      console.error('❌ Error in controller:', err.message);
      throw new HttpException(
        'Failed to send feedback',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
