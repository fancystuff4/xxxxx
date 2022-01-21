import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TOKENS, AuthDto, getTokensConfig } from './common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async localSignUp(input: AuthDto) {
    const { username, role, ...restAttrs } = input;
    const result = await this.userService.create(username, role, restAttrs);

    if (result.errMsg) throw new BadRequestException(result.errMsg);

    return result;
  }

  async localSignIn(input: AuthDto) {
    const { username, role, tenantId, password } = input;
    const result = await this.userService.findOne(username, role, tenantId);

    if (result.errMsg) throw new BadRequestException(result.errMsg);

    const {
      Items: [user],
    } = result;

    if (!user) throw new NotFoundException('User is not found');
    if (user.password !== password)
      throw new BadRequestException('Password is wrong');

    const tokens = await this.getTokens(
      user.username,
      user.role,
      user.tenantId,
    );

    return tokens;
  }

  async refresh(user: any) {
    const { username, role, tenantId } = user;

    const tokens = await this.getTokens(username, role, tenantId);
    return tokens;
  }

  async getTokens(username: string, role: string, tenantId?: string) {
    const payload = { username, role, tenantId };

    const tokenConfigs = getTokensConfig(
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const atPromise = this.jwtService.signAsync(
      payload,
      tokenConfigs.access_token,
    );

    const rtPromise = this.jwtService.signAsync(
      payload,
      tokenConfigs.refresh_token,
    );

    const [at, rt] = await Promise.all([atPromise, rtPromise]);

    return { [TOKENS.ACCESS_TOKEN]: at, [TOKENS.REFRESH_TOKEN]: rt };
  }

  // async updateRefreshTokenInDB(username: string, SK: string, newRT: string) {}
}
