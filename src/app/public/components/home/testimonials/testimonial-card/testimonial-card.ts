import { Component, Input, OnInit } from '@angular/core';
import { ITestimonial } from '../../../../../core/models/Interfaces/ITestimonial.inteface';

@Component({
  selector: 'app-testimonial-card',
  standalone: false,
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.css'
})
export class TestimonialCard implements OnInit {
  @Input() testimonial: ITestimonial | null = null;
  rating: number[] = [];
  ngOnInit(): void {
    this.rating = Array.from({ length: Number(this.testimonial?.ratingNumber) }, (_, i) => i + 1)
  }
}
