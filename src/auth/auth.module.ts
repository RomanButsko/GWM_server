import { UserModule } from './../user/user.module';
import { getJWTConfig } from './../configs/jwt.config';
import { User } from './../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ATJwtStrategy } from './strategy/atJwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ATJwtStrategy, ConfigService],
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
