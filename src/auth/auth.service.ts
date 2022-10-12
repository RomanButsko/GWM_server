import { CreateUserDto } from './../user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { User } from './../user/entities/user.entity';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createTokens(email: string, userId: number): Promise<string> {
    return await this.jwtService.signAsync(
      {
        email,
        id: userId,
      },
      {
        secret:
          this.configService.get<string>('ATJWT_SECRET') || 'ATJWT_SECRET',
        expiresIn: '60s',
      },
    );
  }

  hashData(data: string) {
    return bcrypt.hash(data, 5);
  }

  async register(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (user) {
      throw new HttpException(
        'Пользователь уже зарегестрирован',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashPassword = await this.hashData(dto.password);
    const token = await this.createTokens(dto.email, dto.id);
    const createUser = await this.userRepository.create({
      email: dto.email,
      name: dto.name,
      surname: dto.surname,
      date: dto.date,
      city: dto.city,
      gender: dto.gender,
      accessT: token,
      password: hashPassword,
    });
    return { ...createUser, token };
  }

  async signIn(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Пользователь не зарегестрирован');

    const checkUser = await bcrypt.compare(dto.password, user.password);
    if (!checkUser) {
      throw new ForbiddenException('Введен неверный логин или пароль');
    }
    const tokens = await this.createTokens(user.email, Number(user.id));
    return tokens;
  }

  //неккоректно - нужно поработать с блэк листом
  async logout(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, accessT: { not: null } },
    });
    if (!user) throw new ForbiddenException('Пользователь не вошел в систему');
    return (user.accessT = null);
  }
}
