import { Module } from '@nestjs/common';
import { MobileModule } from '../mobile/mobile.module';
import { DesktopModule } from '../desktop/desktop.module';

@Module({
  imports: [DesktopModule,MobileModule],
})
export class AppModule {}
