import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import {  Image } from '../../interfaces/image.interface';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private imagesService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {}

  public imageForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    file: [null, Validators.required],
  });

  public fileName: string | null = null;public hourCount: number = 0;

  get currentImage(): Image {
    const image = this.imageForm.value as Image;
    return image;
  }

  ngOnInit(): void {
  }



  onSubmit():void {

    if ( this.imageForm.invalid ) {
      alert( 'Por favor complete todos los campos');
      return;
    }
    this.imagesService.addImage( this.currentImage )
      .subscribe( () => {
        this.router.navigate(['/images/list']);
        this.showSnackbar(`Image saved succesfully!`);
      });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.imageForm.controls['file'].setValue(file);
    this.fileName = file.name;
  }

}
