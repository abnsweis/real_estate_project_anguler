import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: false,
  templateUrl: './star.html',
  styleUrl: './star.css'
})
export class Star implements OnInit {
  @Input() rating: number = 0;
  cropValue: number = 145; // Width of the crop area in pixels
  ngOnInit(): void {
    this.rating = this.rating * this.cropValue / 5; // Adjust rating to fit the crop area
  }
}
