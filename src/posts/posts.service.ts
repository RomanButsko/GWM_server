import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private userService: UserService,
  ) {}
  async create(dto: CreatePostDto) {
    return await this.postRepository.create(dto);
  }

  findAll() {
    return this.postRepository.findAll();
  }

  async findMyPost(id: number) {
    const posts = await this.postRepository.findAll({ where: { userId: id } });
    return posts;
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new ForbiddenException('Такой пост не найден');
    }
    return await post.update(updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.destroy({
      where: {
        id,
      },
    });
  }
}
