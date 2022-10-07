import { Module } from '@nestjs/common';

import BrandController from './brand.controller';
import { BrandService } from './brand.service';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { FilesService } from 'src/modules/files/files.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, AuthenticationService, FilesService],
})
export class BrandModule {}
