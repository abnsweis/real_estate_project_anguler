import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard {
  @Input() title!: string;
  @Input() value!: string;
  @Input() color: string = 'text-primary';
  @Input() description: string = '';
}
