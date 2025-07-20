import { Component } from '@angular/core';
import { ImagesService } from '../../../core/services/images.service';

@Component({
  selector: 'app-not-found-404',
  standalone: false,
  templateUrl: './not-found-404.html',
  styleUrl: './not-found-404.css'
})
export class NotFound404 {

  notfoundImage: string = ''
  constructor(private images: ImagesService) {

    this.notfoundImage = this.images.getImageUrl('404Error.svg', 'illustrations');
  }
}
