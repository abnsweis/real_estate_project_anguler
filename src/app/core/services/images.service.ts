import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  baseUrl: string = '../../../assets/img';


  getImageUrl(imageName: string, subfolder: string | undefined): string {
    if (!imageName) {
      return '';
    }
    if (subfolder) {
      return `${this.baseUrl}/${subfolder}/${imageName}`;
    }
    return `${this.baseUrl}/${imageName}`;
  }

}
