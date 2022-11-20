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
  @IsNumber()
  chatId: number;
  @IsString()
  picture: string;
  @IsString()
  bckgPicture: string;
  @IsArray()
  joinUser: number[];
}
