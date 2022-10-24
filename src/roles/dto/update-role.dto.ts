import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  readonly value?: string;
  @IsString()
  readonly description?: string;
}
