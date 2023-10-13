import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageSchema } from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from 'src/providers/storage/storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, StorageService],
})
export class ImagesModule {}
