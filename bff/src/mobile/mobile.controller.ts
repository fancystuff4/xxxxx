import { Controller, Get } from "@nestjs/common";

@Controller('mobile')
class MobileController {
    @Get()
    get() {
        return "Mobile";
    }
}
export default MobileController;