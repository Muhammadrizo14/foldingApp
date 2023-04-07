import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './folder/folder.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, FolderModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
