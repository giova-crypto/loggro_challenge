import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Image> {
    return await this.imagesService.findOne(id);
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

      const gcsPath = `https://storage.cloud.google.com/loggro-images/${gcsFileName}`;

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() post: Image): Promise<Image> {
    return await this.imagesService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Image> {
    return await this.imagesService.delete(id);
  }
}
