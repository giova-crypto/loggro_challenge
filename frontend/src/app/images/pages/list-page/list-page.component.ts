import { Component, OnInit } from '@angular/core';
import { Image, ImageFilter } from '../../interfaces/image.interface';
import { ImagesService } from '../../services/images.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public images: Image[] = [];
  public hourCount: string | null = null;
  public selectedImage?: Image;
  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor( private imagesService: ImagesService, private router: Router, ) {}

  ngOnInit(): void {
    this.imagesService.getImages()
      .subscribe( (images: Image[]) => {
        this.images = images
      });
      this.imagesService.getHourCount().subscribe( (hourCount: string) => {
        this.hourCount = hourCount;
      })
  }

  onSubmit(event: Event): void {
    if ( this.range.value.start == null || this.range.value.end == null ) {
      alert( 'Debe seleccionar ambas fechas fecha');
      event.preventDefault()
      return;
    }else{
      this.imagesService.getImagesByDate(this.range.value.start?this.range.value.start:null, this.range.value.end?this.range.value.end:null)
        .subscribe( (images) => {
          this.images = images!
        });
    }
    
  };

  onClear(): void {
    this.imagesService.getImages()
      .subscribe( (images: Image[]) => {
        this.images = images
      });
      this.hourCount = null;
  }
}
