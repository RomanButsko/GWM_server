import { AuthDto } from './dto/auth.dto';
import { User } from './../user/entities/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Public()
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Public()
  @Post('signIn')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @ApiOperation({ summary: 'Logout пользователя' })
  @ApiResponse({ status: 200, type: '' })
  @Post('logout')
  logout(id: string) {
    return this.authService.logout(+id);
  }
}
