import { Component, Input } from '@angular/core';
import { IRating } from '../../../../../core/models/Interfaces/Irating.inteface';

@Component({
  selector: 'app-rating-section',
  standalone: false,
  templateUrl: './rating-section.html',
  styleUrl: './rating-section.css'
})
export class RatingSection {

  @Input() ratings: IRating[] = [];
}
