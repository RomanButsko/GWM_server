import { IsNumber, IsString, IsDate, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  readonly id?: number;
  @IsString()
  readonly accessT?: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly surname: string;
  @IsDate()
  readonly date: Date;
  @IsString()
  readonly gender: string;
  @IsString()
  readonly city: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly avatarPath: string;
  @IsArray()
  readonly joinPost: number[];
}
