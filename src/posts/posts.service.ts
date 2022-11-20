import { Chat } from 'src/chat/entities/chat.entity';
import { ChatService } from './../chat/chat.service';
import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import * as NodeGeocoder from 'node-geocoder';
let fs = require('fs');
const path = require('path');

const options: NodeGeocoder.Options = {
  provider: 'yandex',
  apiKey: '1c3e1a0b-c5d3-4286-89a6-4878fd37de76',
  formatter: null,
};

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private userService: UserService,
    private chatService: ChatService,
  ) {}
  async create(dto: CreatePostDto, id: number) {
    dto.userId = id;
    const post = await this.postRepository.create(dto);
    const chat = await this.chatService.createChat(
      post.id,
      dto.title,
      dto.userId,
    );
    this.update(post.id, { chatId: +chat.id });
    return post;
  }

  getPathsAvatarPost() {
    const folderPath = 'uploads/postEvent';
    const files = {};
    fs.readdirSync(folderPath).map((dir) => {
      if (dir !== '.DS_Store') {
        files[dir] = [];
        fs.readdirSync(path.join(folderPath, dir)).map((fileName) => {
          if (fileName !== '.DS_Store') {
            files[dir].push(`${folderPath}/${dir}/${fileName}`);
          }
        });
      }
    });
    return files;
  }

  findAll() {
    return this.postRepository.findAll();
  }

  findMostPopular() {
    return this.postRepository.findAll({
      order: [[sequelize.literal('views'), 'ASC']],
    });
  }

  async findMyPostBySearch(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        title: { [Op.iLike]: `%${searchTerm}%` },
      };
    }
    const posts = await this.postRepository.findAll({
      where: {
        ...options,
      },
    });
    return posts;
  }

  async findNewPost() {
    return await this.postRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findByJoinedUser(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      attributes: ['joinUser'],
    });
  }

  async findMyPost(id: number) {
    const posts = await this.postRepository.findAll({ where: { userId: id } });
    return posts;
  }

  async findPost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    post.views++;
    await post.save();

    return post;
  }

  async getAllLocation() {
    const geocoder = NodeGeocoder(options);
    const locations = await this.postRepository.findAll({
      attributes: ['location'],
    });

    const geoLocation = [];
    for (let i = 0; i < locations.length - 1; i++) {
      if (locations[i]) {
        const data = await geocoder.geocode(locations[i].toJSON().location);
        geoLocation.push([data[0].latitude, data[0].longitude]);
      }
    }

    return geoLocation;
  }

  async getExactPointer(id: number) {
    const geocoder = NodeGeocoder(options);
    const location = await this.postRepository.findOne({
      where: { id },
      attributes: ['location'],
    });

    const geoLocation = [];
    const data = await geocoder.geocode(location.location);
    geoLocation.push([data[0].latitude, data[0].longitude]);

    return geoLocation;
  }

  async joinEvent(id: number, postId: number) {
    const user = await this.userService.findOne(id);
    const post = await this.findPost(postId);
    let newUser = Object.assign([], post.toJSON().joinUser);
    newUser.push(user.toJSON().id);

    let newPost = Object.assign([], user.toJSON().joinPost);
    newPost.push(postId);

    await this.update(postId, { joinUser: newUser });
    await this.userService.update(user.toJSON().id, { joinPost: newPost });
  }

  async leaveEvent(id: number, postId: number) {
    const user = await this.userService.findOne(id);
    const post = await this.findPost(postId);

    const newUser = user
      .toJSON()
      .joinPost.filter((userActivePost: number) => userActivePost !== postId);

    const newPost = post
      .toJSON()
      .joinUser.filter((joinedUser) => joinedUser !== id);

    await this.update(postId, { joinUser: newPost });
    await this.userService.update(user.toJSON().id, { joinPost: newUser });
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new ForbiddenException('Такой пост не найден');
    }
    return await post.update(updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findPost(id);
    const picturePath = post.picture.slice(1);
    fs.unlink(picturePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('удалено', picturePath);
    });
    return this.postRepository.destroy({
      where: {
        id,
      },
    });
  }
}
