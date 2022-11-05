import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  readonly id: number;
  @IsString()
  readonly content: string;
}
