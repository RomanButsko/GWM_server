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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
  @Get('chooseBg')
  getPathsAvatarPost() {
    return this.postsService.getPathsAvatarPost();
  }

  @Public()
  @Get('findNewPost')
  findNewPost() {
    return this.postsService.findNewPost();
  }

  @Public()
  @Get('/location')
  getAllLocation() {
    return this.postsService.getAllLocation();
  }

  @Public()
  @Get('/location/:id')
  getExactPointer(@Param('id') id: number) {
    return this.postsService.getExactPointer(id);
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

  @Public()
  @Get('findByJoinedUser/:id')
  findByJoinedUser(@Param('id') id: string) {
    return this.postsService.findByJoinedUser(+id);
  }

  @Post('join/:postId')
  joinToEvent(@CurrentUser('id') id: number, @Param('postId') postId: string) {
    return this.postsService.joinEvent(id, +postId);
  }

  @Post('leaveEvent/:postId')
  leaveEvent(@CurrentUser('id') id: number, @Param('postId') postId: string) {
    return this.postsService.leaveEvent(id, +postId);
  }

  @Patch(':postId')
  @Public()
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+postId, updatePostDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
