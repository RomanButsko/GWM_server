import { Chat } from './../../chat/entities/chat.entity';
import { User } from './../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { INTEGER } from 'sequelize';

interface IPost {
  title: string;
  description: string;
  data: Date;
  location: string;
  userId: number;
  picture: string;
}

@Table
export class Post extends Model<Post, IPost> {
  @ApiProperty({ example: 'id', description: 'id мероприятия' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Поход в кафе.',
    description: 'Заголовок',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Планирую сегодня посетить кафе, кто со мной?...',
    description: 'Описание мероприятия',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: '14/03/2023 15:00',
    description: 'Время мероприятия',
  })
  @Column({
    type: DataType.DATE,
  })
  date: Date;

  @ApiProperty({
    example: 'Путь к картинке',
    description: 'Фото планируемого мероприятия',
  })
  @Column({
    type: DataType.STRING,
  })
  picture: string;

  @ApiProperty({
    example: '304views',
    description: 'Количество просмотров',
  })
  @Column({
    type: DataType.NUMBER,
  })
  views: number;

  @ApiProperty({
    example: '/path/',
    description: 'Путь к файлу заднего фона поста',
  })
  @Column({
    type: DataType.STRING,
  })
  bckgPicture: string;

  @ApiProperty({
    example: 'ул.Московская,д.13',
    description: 'Место встречи',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({ example: '04.05.2020', description: 'Дата создания' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @ApiProperty({ example: '04.05.2020', description: 'Дата обновления' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
  })
  chatId: number;

  @ApiProperty({
    example: 'id - пользователя',
    description: 'id присоединенных пользователей',
  })
  @Column({
    type: DataType.ARRAY(INTEGER),
    allowNull: true,
  })
  joinUser: number[];
}
