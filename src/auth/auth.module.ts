import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from './../roles/roles.module';
import { getJWTConfig } from './../configs/jwt.config';
import { User } from './../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRole } from 'src/roles/entities/user-role.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
  imports: [
    RolesModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SequelizeModule.forFeature([User, Role, UserRole]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
