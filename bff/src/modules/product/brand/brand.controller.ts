import { Body, Controller, Get, Post, Response, Param,Delete,Put, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandInputDto,UpdateBrandDto } from './dto/brand.dto';
import { BrandLogoDto,BrandLogoUpdateDto } from './dto/brand.logo.dto';
import { UpdateBrandStatusDto} from './dto/brand.status.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from '../routes';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller()
@UseGuards(AuthGuard)
class BrandController {
    constructor(private brandService: BrandService) {}

    @Post(DESKTOP_ROUTES.BRANDS)
    async CreateBrandApi(
        @Body() body: BrandInputDto,
        @Response() res: any
    ) : Promise<BrandInputDto> {
        const result :any = await this.brandService.createBrand(body);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.BRAND_WITH_PARAM, MOBILE_ROUTES.BRAND_WITH_PARAM])
    async GetOneBrandApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.brandService.getOneBrand(id);
        return res.status(result.statusCode).json(result);
    }
    
    @PublicRoute()
    @Get([DESKTOP_ROUTES.BRANDS, MOBILE_ROUTES.BRANDS])
    async GetBrandsApi(
        @Response() res: any
    ) : Promise<any> {
        
        const result : any = await this.brandService.getBrands();
        return res.status(result.statusCode).json(result);
    }

    @Delete(DESKTOP_ROUTES.BRAND_WITH_PARAM)
    async DeleteBrandApi(
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<any> {
        
        const result : any = await this.brandService.deleteBrand(id);
        return res.status(result.statusCode).json(result);
    }

    @Put(DESKTOP_ROUTES.BRAND_WITH_PARAM)
    async UpdateBrandApi(
        @Response() res: any,
        @Param('id') id: string,
        @Body() body: UpdateBrandDto,
    ) : Promise<UpdateBrandDto > {
        
        const result : any = await this.brandService.updateBrand(body,id);
        return res.status(result.statusCode).json(result);
    }

    @Put(DESKTOP_ROUTES.BRAND_STATUS)
    async UpdateBrandStatusApi(
        @Body() body: UpdateBrandStatusDto,
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<void> {
        
        const result : any = await this.brandService.updateBrandStatus(body,id);
        return res.status(result.statusCode).json(result);
    }

    @Post(DESKTOP_ROUTES.BRAND_LOGOS)
    async AddBrandLogoApi(
        @Body() body: BrandLogoDto,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<BrandLogoDto> {
        const result :  any = await this.brandService.addBrandLogo(body,id);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.BRAND_LOGOS, MOBILE_ROUTES.BRAND_LOGOS])
    async GetBrandLogosApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.brandService.getBrandLogos(id);
        return res.status(result.statusCode).json(result);
    }

    @Put(DESKTOP_ROUTES.BRAND_LOGO_WITH_PARAM)
    async UpdateBrandLogoApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('logoId') logoId: string,
        @Body() body: BrandLogoUpdateDto,
    ) : Promise< BrandLogoUpdateDto> {
        
        const result :  any = await this.brandService.updateBrandLogo(body,id,logoId);
        return res.status(result.statusCode).json(result);
    }

    @Delete(DESKTOP_ROUTES.BRAND_LOGO_WITH_PARAM)
    async DeleteBrandLogoApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('logoId') logoId: string,
    ) : Promise<any> {
        
        const result : any = await this.brandService.deleteBrandLogo(id,logoId);
        return res.status(result.statusCode).json(result);
    }
}
export default BrandController;