import { IsString, IsDate, IsNumber, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsDate()
  date: Date;
  @IsString()
  location: string;
  @IsNumber()
  userId: number;
  @IsString()
  picture: string;
  @IsArray()
  joinUser: number[];
}
