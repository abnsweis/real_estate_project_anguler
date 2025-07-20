import { Component, Input } from '@angular/core';
import { IProperty } from '../../../../../core/models/property.interface';

@Component({
  selector: 'app-property-card',
  standalone: false,
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCard {
  @Input() property: IProperty | null = null;

}
