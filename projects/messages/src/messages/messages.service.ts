import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.respository';

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessageRepository) {}

  findById(id: string) {
    return this.messagesRepo.findById(id);
  }

  listAll() {
    return this.messagesRepo.listAll();
  }

  createOne(message: string) {
    return this.messagesRepo.createOne(message);
  }
}
