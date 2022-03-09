import { Body, Controller, Get, Post, Request, Response } from "@nestjs/common";
import { SignInInputDto } from "src/common/dto/sign_in_input.dto";
import { SignUpInputDto } from "src/common/dto/sign_up_input.dto";
import { MAIN_ROUTES } from "../../helpers/routes";
import { AuthenticationService } from "./authentication.service";
import { ROUTES } from "./helpers/routes";
import { ProfileWrapperDto } from "./helpers/dto/profile_wrapper.dto";
import { SignInWrapperDto } from "./helpers/dto/sign_in_wrapper.dto";
import { RequestedHeaderDto } from "src/common/dto/requested_header.dto";

@Controller(MAIN_ROUTES.AUTH)
class AuthenticationController {

  constructor(private authenticationService: AuthenticationService) {}

    @Post(ROUTES.SIGN_UP)
    async signUp(
      @Body() body: SignUpInputDto,
      @Response() res: any
    ) : Promise<any> {
      const result: ProfileWrapperDto = await this.authenticationService.signup(body);
      return res.status(result.statusCode).json(result);
    }

    @Post(ROUTES.SIGN_IN)
    async PostSignInAPI(
        @Body() body: SignInInputDto,
        @Response() res: any
    ) : Promise<any> {
        const result : SignInWrapperDto = await this.authenticationService.signin(body);
        return res.status(result.statusCode).json(result);
    }

    @Get(ROUTES.PROFILE)
    async GetUserProfile(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.getProfile(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

    @Get(ROUTES.REFRESH)
    async GetRefreshToken(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.refresh(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

    @Get(ROUTES.LOGOUT)
    async LogOut(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : RequestedHeaderDto = { 
            'authorization' : `${req.headers.authorization}`
        }
        const result = await this.authenticationService.logout(requestedHeader);
        return res.status(result.statusCode).json(result);
    }

}
export default AuthenticationController;