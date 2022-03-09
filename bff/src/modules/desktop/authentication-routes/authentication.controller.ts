import { Body, Controller, Get, Post, Response, Request, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { HttpService } from '@nestjs/axios';
import { GetUserProfileDto, GetUserProfileResponseDto } from './dto/getUserProfile.dto';
import { LogoutDto, LogoutResponseDto } from './dto/logout.dto';
import { GetRefreshTokenDto, GetRefreshTokenResponseDto } from './dto/refresh.dto';
import { ErrorDto, ErrorResponseDto } from './dto/error.dto';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import { RequestedHeaderDto } from '../../../common/dto/requested_header.dto';
import { SigninInputDto, SignupInputDto } from './dto/userDetailsInput.dto';
import { plainToClass } from 'class-transformer';

@Controller('desktop/auth')
class AuthenticationController {

    constructor(private authenticationService: AuthenticationService, private httpService: HttpService) {}

    // @Post('local/signup')
    // async PostSignupAPI(
    //     @Body() body: SignupInputDto,
    //     @Response() res: any
    // ) : Promise<any> {
    //     const result: signInResponse = await this.authenticationService.signup(body);
    //     return res.status(result.statusCode).json(result);
    // }

    // @Post('local/signin')
    // async PostSignInAPI(
    //     @Body() body: SigninInputDto,
    //     @Response() res: any
    // ) : Promise<any> {
    //     const result : SigninResponseDto | ErrorResponseDto = await this.authenticationService.signin(body);
    //     return res.status(result.statusCode).json(result.data);
    // }

    // @Post('refresh')
    // async GetRefreshToken(
    //     @Response() res: any,
    //     @Request() req: any
    // ) : Promise<GetRefreshTokenDto | ErrorDto> {
    //     const requestedHeader : RequestedHeaderDto = { 
    //         'authorization' : `${req.headers.authorization}`
    //     }
    //     const result : GetRefreshTokenResponseDto | ErrorResponseDto = await this.authenticationService.refresh(requestedHeader);
    //     return res.status(result.statusCode).json(result.data);
    // }

    // @Post('logout')
    // async UserLogout(
    //     @Response() res: any,
    //     @Request() req: any
    // ) : Promise<LogoutDto | ErrorDto> {
    //     const requestedHeader : RequestedHeaderDto = { 
    //         'authorization' : `${req.headers.authorization}`
    //     }
    //     const result : LogoutResponseDto | ErrorResponseDto = await this.authenticationService.logout(requestedHeader);
    //     return res.status(result.statusCode).json(result.data);
    // }

    // @Get('profile')
    // async GetUserProfile(
    //     @Response() res: any,
    //     @Request() req: any
    // ) : Promise<any> {
    //     const requestedHeader : RequestedHeaderDto = { 
    //         'authorization' : `${req.headers.authorization}`
    //     }
    //     const result = await this.authenticationService.getProfile(requestedHeader);
    //     return res.status(result.statusCode).json(result);
    // }
}
export default AuthenticationController;