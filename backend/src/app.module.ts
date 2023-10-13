import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './providers/storage/storage.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/global.exception.filter';

@Module({
  imports: [ImagesModule, MongooseModule.forRoot('mongodb://localhost/loggro')],
  controllers: [AppController],
  providers: [
    AppService,
    StorageService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
