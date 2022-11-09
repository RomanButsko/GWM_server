import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/roles/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private RoleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.RoleRepository.create(dto);
  }

  async findAll() {
    return await this.RoleRepository.findAll();
  }

  async getRoleByValue(value: string) {
    const role = await this.RoleRepository.findOne({ where: { value } });
    return role.toJSON();
  }

  async update(id: number, dto: UpdateRoleDto) {
    const post = this.RoleRepository.findOne({ where: { id } });
    return post.then((res) => res.update(dto));
  }

  async remove(id: number) {
    const post = this.RoleRepository.findOne({ where: { id } });
    return post.then((res) => res.destroy());
  }
}
