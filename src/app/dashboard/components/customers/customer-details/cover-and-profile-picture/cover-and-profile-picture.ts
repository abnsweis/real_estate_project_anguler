import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover-and-profile-picture',
  standalone: false,
  templateUrl: './cover-and-profile-picture.html',
  styleUrl: './cover-and-profile-picture.css'
})
export class CoverAndProfilePicture {
  @Input() customerImage: string = '';
}
