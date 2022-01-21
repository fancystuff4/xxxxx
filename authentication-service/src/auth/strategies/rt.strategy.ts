import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RtJWTStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const { username, role, tenantId } = payload;

    const result = await this.userService.findOne(username, role, tenantId);

    if (result.errMsg) throw new BadRequestException(result.errMsg);

    const {
      Items: [user],
    } = result;

    if (!user) throw new NotFoundException('User is not found');

    delete user.password;
    return user;
  }
}
