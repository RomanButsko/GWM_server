import { IsString, IsDate, IsNumber } from 'class-validator';

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
}
