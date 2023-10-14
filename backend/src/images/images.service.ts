import { Injectable } from '@nestjs/common';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  async findAll(): Promise<Image[]> {
    return await this.imageModel.find().exec();
  }

  async findByDate(start: string, end: string): Promise<any> {
    const date1 = new Date(start);
    const date2 = new Date(end);
    date2.setDate(date2.getDate() + 1);
    const miliDifference = date2.getTime() - date1.getTime();
    const hourDifference = miliDifference / (1000 * 60 * 60);
    const images = await this.imageModel
      .find({
        uploadDate: {
          $gte: date1,
          $lte: date2,
        },
      })
      .exec();

    const hourCount = Math.abs(images.length / hourDifference).toFixed(5);
    return { images: images, hourCount: hourCount };
  }

  async create(image: Image): Promise<Image> {
    const newPost = new this.imageModel(image);
    return await newPost.save();
  }

  async update(id: string, image: Image): Promise<Image> {
    return await this.imageModel.findByIdAndUpdate(id, image, { new: true });
  }

  async delete(id: string): Promise<Image> {
    return await this.imageModel.findByIdAndRemove(id);
  }
}
