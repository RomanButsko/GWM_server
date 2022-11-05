import { Chat } from './entities/chat.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat) private chatRepository: typeof Chat) {}

  async createMessage(dto: CreateChatDto) {
    return await this.chatRepository.create({ dto });
  }

  async getMessages() {
    return await this.chatRepository.findAll();
  }

  async getOneMessage(id: number) {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async updateMessage(id: number, dto: UpdateChatDto) {
    return await this.getOneMessage(id).then((message) => message.update(dto));
  }

  async deleteMessage(id: number) {
    return await this.chatRepository.destroy({ where: { id } });
  }

  //for developer

  async deleteMessages() {
    return await this.chatRepository.destroy();
  }
}
