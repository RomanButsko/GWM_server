import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, DataType } from 'sequelize-typescript';

@Table
export class Base {
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
}
