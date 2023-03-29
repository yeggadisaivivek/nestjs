import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageRepository } from './messages.respository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
