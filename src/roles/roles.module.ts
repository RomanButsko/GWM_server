import { Role } from 'src/roles/entities/role.entity';
import { User } from './../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UserRole } from './entities/user-role.entity';

@Module({
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([User, Role, UserRole])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
