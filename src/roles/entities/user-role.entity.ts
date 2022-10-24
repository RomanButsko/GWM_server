import { Role } from 'src/roles/entities/role.entity';
import { User } from './../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';

@Table({ createdAt: false, updatedAt: false })
export class UserRole extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '5',
    description: 'id Пользователя',
  })
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({
    example: 'id',
    description: 'id роли',
  })
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Role)
  roleId: number;
}
