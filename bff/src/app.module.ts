import { Module } from '@nestjs/common';
import { MobileModule } from './modules/mobile/mobile.module';
import { DesktopModule } from './modules/desktop/desktop.module';

@Module({
  imports: [DesktopModule,MobileModule],
})
export class AppModule {}
