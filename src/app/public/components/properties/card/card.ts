import { Component, Input } from '@angular/core';
import { IProperty } from '../../../../core/models/property.interface';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  price: Number = 1550000;
  @Input() extraClass: string = '';
  @Input() property!: IProperty;
}
