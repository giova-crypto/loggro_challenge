import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../interfaces/image.interface';

@Pipe({
  name: 'image'
})
export class HeroImagePipe implements PipeTransform {

  transform( image: Image ): string {

    if ( !image._id ) {
      return 'assets/no-image.png';
    }

    return `${ image.url }`;

  }

}
