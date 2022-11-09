import { Controller, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create/:id')
  async createChat(@Param('id') id: string, content: string) {
    return await this.chatService.createChat(+id, content);
  }
}
