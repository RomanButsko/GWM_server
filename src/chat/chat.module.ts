import { Chat } from './entities/chat.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  imports: [SequelizeModule.forFeature([User, Chat])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
