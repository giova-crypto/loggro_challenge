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

  async findByDate(start: string, end: string): Promise<Image[]> {
    const date1 = new Date(start);
    const date2 = new Date(end);
    date2.setDate(date2.getDate() + 1);
    return await this.imageModel
      .find({
        uploadDate: {
          $gte: date1,
          $lte: date2,
        },
      })
      .exec();
  }

  async create(image: Image): Promise<Image> {
    const newPost = new this.imageModel(image);
    return await newPost.save();
  }

  async getImagesByHour() {
    return this.imageModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d %H', date: '$uploadDate' },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  async finAverage(): Promise<any> {
    const oldestImage = await this.imageModel
      .find()
      .sort({ uploadDate: 1 })
      .limit(1)
      .exec();
    const newerImage = await this.imageModel
      .find()
      .sort({ uploadDate: -1 })
      .limit(1)
      .exec();
    const imagesCount: number = await this.imageModel.countDocuments();
    const date1 = new Date(oldestImage[0].uploadDate);
    const date2 = new Date(newerImage[0].uploadDate);
    const diff = date2.getTime() - date1.getTime();
    const hours = diff / (1000 * 60 * 60);
    return (imagesCount / hours).toFixed(5);
  }
}
