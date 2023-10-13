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

  async findOne(id: string): Promise<Image> {
    return await this.imageModel.findById(id).exec();
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
