import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  listMessages() {
    return this.messagesService.listAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    return this.messagesService.createOne(body.content);
  }

  @Get('/:id')
  async getMessageWithId(@Param('id') id: string) {
    const messages = await this.messagesService.findById(id);

    if (!messages) {
      throw new NotFoundException('message not found');
    }

    return messages;
  }
}
