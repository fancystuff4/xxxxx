import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { FilesService } from 'src/modules/files/files.service';
import VariantController from './variant.controller';
import { VariantService } from './variant.service';

@Module({
  controllers: [VariantController],
  providers: [VariantService, AuthenticationService, FilesService],
  exports: [VariantService],
})
export class VariantModule {}
