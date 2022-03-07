import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put, ParseBoolPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { HttpService } from '@nestjs/axios';
import { BrandInputDto,CreateBrandResponseDto } from './dto/createBrand.dto';
import { UpdateBrandDto ,UpdateBrandResponseDto} from './dto/brand.update.dto';
import { UpdateBrandStatusDto} from './dto/brand.status.dto';
import { GetBrandInputDto,GetBrandResponseDto } from './dto/getBrand.dto';
import { ErrorDto, ErrorResponseDto } from './dto/error.dto';

@Controller('desktop/brand')
class BrandController {
    constructor(private brandService: BrandService, private httpService: HttpService) {}

    @Post()
    async CreateBrandApi(
        @Body() body: BrandInputDto,
        @Response() res: any
    ) : Promise<BrandInputDto | ErrorDto> {
        const result : CreateBrandResponseDto | ErrorResponseDto = await this.brandService.createBrand(body);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':id')
    async GetOneBrandApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.brandService.getOneBrand(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get()
    async GetBrandsApi(
        @Response() res: any
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.brandService.getBrands();
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':id')
    async DeleteBrandApi(
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.brandService.deleteBrand(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id')
    async UpdateBrandApi(
        @Response() res: any,
        @Param('id') id: string,
        @Body() body: UpdateBrandDto,
    ) : Promise<UpdateBrandDto | ErrorDto> {
        
        const result : UpdateBrandResponseDto | ErrorResponseDto = await this.brandService.updateBrand(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id/active')
    async UpdateBrandStatusApi(
        @Body() body: UpdateBrandStatusDto,
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.brandService.updateBrandStatus(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(':id/logos')
    async AddBrandLogoApi(
        @Body() body: any,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.brandService.addBrandLogo(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':id/logos')
    async GetBrandLogosApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.brandService.getBrandLogos(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id/logos/:logoId')
    async UpdateBrandLogoApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('logoId') logoId: string,
        @Body() body: any,
    ) : Promise< ErrorDto> {
        
        const result :  ErrorResponseDto = await this.brandService.updateBrandLogo(body,id,logoId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':id/logos/:logoId')
    async DeleteBrandLogoApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('logoId') logoId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.brandService.deleteBrandLogo(id,logoId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default BrandController;