import { CurrentUser } from './user.decorator';
import { User } from './entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('profile')
  getProfile(@CurrentUser('id') id: number) {
    return this.userService.findOne(id);
  }
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Получение пользователя без его публикаций' })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @Get('pureUser/:id')
  findOneWithoutPosts(@Param('id') id: string) {
    return this.userService.findOneWithoutPosts(+id);
  }

  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiOperation({
    summary: 'Получение основных данных пользователя(id, name, surname photo)',
  })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @Get('baseDataUser/:id')
  findBaseDataUsers(@Param('id') id: string) {
    return this.userService.findBaseDataUsers(+id);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Public()
  @Get()
  findALL() {
    return this.userService.findALL();
  }

  @ApiOperation({ summary: 'Обновление данных пользователя(email, password)' })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteOne(+id);
  }

  @ApiOperation({ summary: 'Добавление Like пользователю' })
  @ApiResponse({ status: 200 })
  @Post('/like/:id')
  likeUser(@Param('id') id: string) {
    return this.userService.likeUser(+id);
  }

  @ApiOperation({ summary: 'Добавление dislike пользователю' })
  @ApiResponse({ status: 200 })
  @Post('/dislike/:id')
  dislikeUser(@Param('id') id: string) {
    return this.userService.likeUser(+id);
  }
}
