// Generated by https://quicktype.io

export interface Image {
  _id?: string;
  username: string;
  uploadDate?: Date;
  url?: string;
}


export interface ImageFilter {
  images: Image[];
  hourCount?: number;
}