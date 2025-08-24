import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard {
  @Input() title!: string | null;
  @Input() value!: string | null;
  @Input() color: string | null = 'text-primary';
  @Input() description: string | null = '';

}
