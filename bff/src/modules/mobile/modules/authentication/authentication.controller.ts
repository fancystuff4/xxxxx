import { Controller, Get } from "@nestjs/common";
import { MAIN_ROUTES } from "../../helpers/routes";
import { ROUTES } from "./helpers/routes";

@Controller(MAIN_ROUTES.AUTH)
class AuthenticationController {

    @Get(ROUTES.SIGN_UP)
    getHello(): string {
      return "hello world";
    }

}
export default AuthenticationController;