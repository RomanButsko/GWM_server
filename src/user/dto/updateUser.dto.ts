import { IsEmail, IsString, IsDate } from 'class-validator';

export class UpdateUserDto {
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
}
