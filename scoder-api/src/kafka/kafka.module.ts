import { forwardRef, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { FeedbackModule } from '../feedback/feedback.module';

@Module({
  imports: [forwardRef(() => FeedbackModule)],
  providers: [KafkaService],
  controllers: [KafkaController],
  exports: [KafkaService],
})
export class KafkaModule {}
