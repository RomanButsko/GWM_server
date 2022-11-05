import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table
export class Chat extends Model {
  @ApiProperty({ example: 'id', description: 'id чата' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'текст сообщения' })
  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
