import { User } from './../../user/entities/user.entity';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ATJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private userRepository: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('ATJWT_SECRET'),
    });
  }

  async validate({ id }: Pick<User, 'id'>) {
    return await this.userRepository.findByPk(id);
  }
}
