import { User } from './../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface IPost {
  title: string;
  description: string;
  data: Date;
  location: string;
  userId: number;
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
    example: 'ул.Московская,д.13',
    description: 'Место встречи',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
