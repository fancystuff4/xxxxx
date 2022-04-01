import { Body, Controller, Get, Post, Request, Response } from "@nestjs/common";
import { SignInInputDto } from "src/common/dto/sign_in_input.dto";
import { SignUpInputDto } from "src/common/dto/sign_up_input.dto";
import { MAIN_ROUTES } from "../../common/routes";
import { AuthenticationService } from "./authentication.service";
import { DESKTOP_ROUTES, MOBILE_ROUTES } from "./helpers/routes";
import { ProfileWrapperDto } from "./helpers/dto/profile_wrapper.dto";
import { RequestedHeaderDto } from "src/common/dto/requested_header.dto";
import { plainToClass } from "class-transformer";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Authentication')
@Controller(MAIN_ROUTES.AUTH)
class AuthenticationController {

  constructor(private authenticationService: AuthenticationService) {}

    @Post(DESKTOP_ROUTES.SIGN_UP)
    async signUpDesktop(
      @Body() body: SignUpInputDto,
      @Response() res: any
    ) : Promise<any> {
      const result = await this.authenticationService.signup(body);
      return res.status(result.statusCode).json(result);
    }

    @Post([DESKTOP_ROUTES.SIGN_IN, MOBILE_ROUTES.SIGN_IN])
    async signIn(
        @Body() body: SignInInputDto,
        @Response() res: any
    ) : Promise<any> {
        const result = await this.authenticationService.signin(body);
        return res.status(result.statusCode).json(result);
    }

    @Get(DESKTOP_ROUTES.PROFILE)
    async getUserProfileDesktop(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.getProfile(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

    @Get([DESKTOP_ROUTES.REFRESH, MOBILE_ROUTES.REFRESH])
    async getRefreshToken(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.refresh(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

    @Get([DESKTOP_ROUTES.LOGOUT, MOBILE_ROUTES.LOGOUT])
    async logOut(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.logout(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

    @Post(MOBILE_ROUTES.SIGN_UP)
    async signUpMobile(
      @Body() body: SignUpInputDto,
      @Response() res: any
    ) : Promise<any> {
      const result = await this.authenticationService.signup(body);
      const response = plainToClass(ProfileWrapperDto, result);
      return res.status(result.statusCode).json(response);
    }

    @Get(MOBILE_ROUTES.PROFILE)
    async getUserProfileMobile(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = {
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.getProfile(requestedHeader);
        const response = plainToClass(ProfileWrapperDto, result);
        return res.status(result.statusCode).json(response);
    }

}
export default AuthenticationController;