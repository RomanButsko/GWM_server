import { UserModule } from './../user/user.module';
import { User } from './../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  controllers: [MediaController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    SequelizeModule.forFeature([User]),
    UserModule,
  ],
  providers: [MediaService],
})
export class MediaModule {}
