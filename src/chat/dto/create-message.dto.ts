import { IsBoolean, IsNumber, IsDate, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly text: string;
  @IsNumber()
  readonly dialogID: number;
  @IsNumber()
  readonly userIdTo?: number[];
  @IsNumber()
  readonly userIdFrom: number;
  @IsBoolean()
  readonly isRead?: boolean;
}
