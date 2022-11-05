import { ChatService } from './chat/chat.service';
import { sequalizeConfig } from './configs/sequelize.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/decorators';
import { RolesModule } from './roles/roles.module';
import { MediaModule } from './media/media.module';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.development.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: sequalizeConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PostsModule,
    RolesModule,
    MediaModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppGateway,
  ],
})
export class AppModule {}
