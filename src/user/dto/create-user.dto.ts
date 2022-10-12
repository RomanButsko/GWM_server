import { IsNumber, IsString } from 'class-validator';
import { UpdateUserDto } from './updateUser.dto';

export class CreateUserDto extends UpdateUserDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly accessT?: string;
}
