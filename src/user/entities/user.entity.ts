import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';

@Table
export class User extends Model {
  static find() {
    throw new Error('Method not implemented.');
  }
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'test@test.com', description: 'Почтовый адрес' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'Name', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'surname', description: 'Фамилия пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @ApiProperty({ example: 'Люблю развлечения', description: 'Обо мне' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  aboutMe?: string;

  @ApiProperty({ example: 'path', description: 'Путь к фото пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatarPath: string;

  @ApiProperty({
    example: '##/##/####',
    description: 'Дата рождения пользователя',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ApiProperty({
    example: 'male | female',
    description: 'Пол пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @ApiProperty({
    example: 'Minsk',
    description: 'Местонахождение пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: 'true', description: 'Заблокированный пользователь' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'Нарушение правил сервиса',
    description: 'Причина блокировки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @ApiProperty({
    example: 'Нарушение правил сервиса',
    description: 'Причина блокировки',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  like: number;
  @ApiProperty({
    example: 'Нарушение правил сервиса',
    description: 'Причина блокировки',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dislike: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accessT: string;

  @HasMany(() => Post)
  posts?: Post[];
}
