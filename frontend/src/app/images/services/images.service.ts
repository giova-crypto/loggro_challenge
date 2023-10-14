import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Image, ImageFilter } from '../interfaces/image.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ImagesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getImages():Observable<Image[]> {
    return this.http.get<Image[]>(`${ this.baseUrl }/images`);
  }

  getImagesByDate( start: Date|null, end: Date|null): Observable<Image[]|undefined> {
    return this.http.get<Image[]>(`${ this.baseUrl }/images/filter?start=${ start }&end=${ end }`);
  }

  addImage( image: any ): Observable<Image> {
    const formData: FormData = new FormData();
    formData.append('username', image.username);
    formData.append('file', image.file);
    return this.http.post<Image>(`${ this.baseUrl }/images`, formData);
  }

  getHourCount():Observable<string> {
    return this.http.get<string>(`${ this.baseUrl }/images/avg-per-hour`);
  }

}
