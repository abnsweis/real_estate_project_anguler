import { Component } from '@angular/core';
import { ImagesService } from '../../../core/services/images.service';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

  constructor( public imageService:ImagesService){
    
  }

}
