import { IsNumber, IsString } from 'class-validator';

export class UpdateChatDto {
  @IsNumber()
  messageId: number;
  @IsNumber()
  userId: number;
  @IsString()
  text: string;
}
