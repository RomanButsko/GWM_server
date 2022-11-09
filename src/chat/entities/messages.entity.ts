import { User } from './../../user/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Messages extends Model<Messages, Messages> {
  @ApiProperty({ example: 'id', description: 'id сообщения' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'текст сообщения' })
  @Column({
    type: DataType.STRING,
  })
  text: string;

  @ApiProperty({ description: 'id диалога' })
  @ForeignKey(() => Chat)
  @Column({
    type: DataType.INTEGER,
  })
  dialogID: number;

  @ApiProperty({ description: 'id пользователя для получения сообщения' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  userIdTo?: number[];

  @ApiProperty({ description: 'id пользователя для отправки сообщения' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userIdFrom: number;

  @ApiProperty({ description: 'прочитано ли сообщение получателем' })
  @Column({
    type: DataType.BOOLEAN,
  })
  isRead: boolean;
}
