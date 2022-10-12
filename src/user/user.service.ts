import { User } from './entities/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: [{ model: Post }],
    });
    if (!user) throw new ForbiddenException('Пользователь не найден');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new ForbiddenException('Пользователь не найден');
    return user;
  }

  async findALL() {
    const user = await this.userRepository.findAll({ include: { all: true } });
    if (!user) throw new ForbiddenException('Пользователи не найдены');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.findOne(id).then((user) => user.update(updateUserDto));
  }

  async deleteOne(id: number) {
    return this.userRepository.destroy({
      where: {
        id,
      },
    });
  }

  async likeUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) user.like++;
    return null;
  }

  async dislikeUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) user.dislike++;
    return null;
  }
}
