import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';

@Table
export class Chat extends Model<Chat, Chat> {
  @ApiProperty({ example: 'id', description: 'id чата' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'title поста' })
  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  usersID: number[];

  @Column({
    type: DataType.INTEGER,
  })
  postId: number;
}
