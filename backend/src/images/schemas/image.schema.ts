import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop()
  username: string;

  @Prop()
  uploadDate: Date;

  @Prop()
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
