import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './schemas/image.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import Jimp from 'jimp';
import { StorageService } from 'src/providers/storage/storage.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  async findAll(): Promise<Image[]> {
    return await this.imagesService.findAll();
  }

  @Get('/filter')
  async findByDate(@Query() query: any): Promise<Image[]> {
    return await this.imagesService.findByDate(query.start, query.end);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 24 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ): Promise<Image | any> {
    try {
      const jimpImage = await Jimp.read(file.buffer);
      const pngBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
      // Sube la imagen convertida a GCS
      const bucket = this.storageService.getBucket();
      const gcsFileName = `images/${Date.now()}.png`;

      await bucket.file(gcsFileName).save(pngBuffer, {
        contentType: 'image/png',
      });

      const gcsPath = `https://storage.googleapis.com/loggro-images/${gcsFileName}`;

      const post = {
        username: body.username,
        uploadDate: new Date(),
        url: gcsPath,
      };
      return await this.imagesService.create(post);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/hourly')
  async getImagesProcessedByHour() {
    return this.imagesService.getImagesByHour();
  }

  @Get('avg-per-hour')
  async findAverage(): Promise<any> {
    return await this.imagesService.finAverage();
  }
}
