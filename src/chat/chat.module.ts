import { Messages } from './entities/messages.entity';
import { UserModule } from './../user/user.module';
import { ChatGateway } from './chat.gateway';
import { Chat } from './entities/chat.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  controllers: [ChatController],
  imports: [
    SequelizeModule.forFeature([User, Chat, Post, Messages]),
    UserModule,
  ],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
