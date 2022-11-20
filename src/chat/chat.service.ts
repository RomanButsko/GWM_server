import { Messages } from './entities/messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from 'src/chat/entities/chat.entity';
import { HttpException, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(Messages) private messagesRepository: typeof Messages,
  ) {}

  async createChat(id: number, content: string, userId: number) {
    return await this.chatRepository.create({
      postId: id,
      content,
      usersID: [userId],
    });
  }

  async getChat(id: number) {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async connectToChat(chatId: number, userId: number) {
    const chat = await this.findChatByPostId(chatId);
    if (chat.usersID.includes(userId)) {
      return new ForbiddenException('Пользователь уже состоит в чате');
    }
    chat.usersID.push(userId);
    chat.changed('usersID', true);
    chat.save();

    return chat;
  }

  async leaveToChat(chatId: number, userId: number) {
    const chat = await this.findChatByPostId(chatId);
    if (!chat.usersID.includes(userId) && chat.postId) {
      return new ForbiddenException('Пользователь не состоит в чате');
    }
    chat.usersID = chat.usersID.filter((user) => user !== userId);
    chat.changed('usersID', true);
    chat.save();
    return chat;
  }

  async findChatByPostId(postId: number) {
    return await this.chatRepository.findOne({ where: { postId } });
  }

  async createMessage(dto: CreateMessageDto) {
    return await this.messagesRepository.create(dto);
  }

  async getMessages(dialogID: number) {
    const messages = await this.messagesRepository.findAll({
      where: { dialogID },
      order: [['updatedAt', 'ASC']],
    });

    return messages;
  }

  async updateMessage(dto: UpdateChatDto) {
    const message = await this.messagesRepository.findOne({
      where: { id: dto.messageId },
    });
    if (message && dto.userId === message.userIdFrom) {
      return message.update({ text: dto.text });
    } else {
      new ForbiddenException('Редактирование чужого сообщения запрещено');
    }
  }

  async deleteMessage(messageId: number, userId: number) {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId },
    });
    if (message && userId === message.userIdFrom) {
      return message.destroy();
    } else {
      new ForbiddenException('Удаление чужого сообщения запрещено');
    }
  }

  //for developer

  async deleteMessages() {
    return await this.chatRepository.destroy();
  }
}
