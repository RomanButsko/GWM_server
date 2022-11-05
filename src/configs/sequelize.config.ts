import { Chat } from './../chat/entities/chat.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Post } from 'src/posts/entities/post.entity';
import { UserRole } from 'src/roles/entities/user-role.entity';

export const sequalizeConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => ({
  dialect: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USERNAME'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  models: [User, Post, Role, UserRole, Chat],
  autoLoadModels: true,
  synchronize: true,
});
