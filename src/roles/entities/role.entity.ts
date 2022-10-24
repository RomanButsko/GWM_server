import { User } from './../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';

interface IRole {
  value: string;
  description: string;
}

@Table({ createdAt: false, updatedAt: false })
export class Role extends Model<Role, IRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Admin | User',
    description: 'Тип роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example:
      'Разрешено: редактировать посты, контролировать поведение пользователей и т.д. ...',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
