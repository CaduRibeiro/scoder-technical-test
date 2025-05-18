import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeedbackService } from '../feedback/feedback.service';

@Controller()
export class KafkaController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @MessagePattern('feedback-submitted')
  async handleFeedback(@Payload() feedback: any) {
    console.log('📥 Received feedback from Kafka:', feedback);
    await this.feedbackService.handleFeedback(feedback);
  }
}
