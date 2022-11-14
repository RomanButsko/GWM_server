import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Public } from 'src/auth/decorators';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @Get('/:id')
  async getChat(@Param('id') id: number) {
    return await this.chatService.getChat(id);
  }

  @Public()
  @Post('findUser')
  async findUserFromChat(@Body('id') id: number) {
    return await this.chatService.findUserFromChat(id);
  }
}
