import { AuthDecorator } from './decorators/auth.decorator';
import { AuthDto } from './dto/auth.dto';
import { User } from './../user/entities/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('signIn')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @ApiOperation({ summary: 'Logout пользователя' })
  @ApiResponse({ status: 200, type: '' })
  @AuthDecorator()
  @Post('logout')
  logout(id: string) {
    return this.authService.logout(+id);
  }
}
