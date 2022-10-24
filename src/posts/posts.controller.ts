import { Public } from './../auth/decorators/public.decorator';
import { CurrentUser } from './../user/user.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  async create(
    @CurrentUser('id') id: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postsService.create(createPostDto, id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photos', {
      dest: './uploads',
    }),
  )
  async uploadPicture(@UploadedFile() file) {
    console.log('picture');
  }

  @Public()
  @Get('findPost')
  findAll() {
    return this.postsService.findAll();
  }
  @Public()
  @Get('findMostPopular')
  findMostPopular() {
    return this.postsService.findMostPopular();
  }

  @Public()
  @Get('findNewPost')
  findNewPost() {
    return this.postsService.findNewPost();
  }

  @Get('findMyPost/:id')
  findMyPost(@Param('id') id: string) {
    return this.postsService.findMyPost(+id);
  }

  @Public()
  @Get()
  findMyPostBySearch(@Query('searchParam') searchParam: string) {
    return this.postsService.findMyPostBySearch(searchParam);
  }

  @Public()
  @Get('findPost/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findPost(+id);
  }

  @Patch(':postId')
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+postId, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
