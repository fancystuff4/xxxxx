import { Controller, Get, Param, Post, Query, Request, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

    constructor(
        private fileService: FilesService
    ) {}

    @Post("/")
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file,
        @Response() res: any
    ): Promise<void> {
        try {
            const fileUrl = await this.fileService.uploadFile(file)
            return res.status(200).json({fileUrl});
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    @Get("/getSignedUrl")
    async getSignedUrl(
        @Query('key') key: string,
        @Response() res: any,
    ): Promise<void> {
        try {
            const signedUrl = await this.fileService.getSignedUrl(key)
            return res.status(301).location(signedUrl).send()
        } catch (error) {
            return res.status(400).json(error);
        }
    }

}
