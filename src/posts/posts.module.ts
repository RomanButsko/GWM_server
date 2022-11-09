import { ChatModule } from './../chat/chat.module';
import { Chat } from './../chat/entities/chat.entity';
import { UserModule } from './../user/user.module';
import { User } from './../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post, Chat]),
    UserModule,
    ChatModule,
  ],
})
export class PostsModule {}
