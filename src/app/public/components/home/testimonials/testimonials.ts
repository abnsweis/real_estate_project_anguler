import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../../../../core/services/testimonials.service';
import { ITestimonial } from '../../../../core/models/Interfaces/ITestimonial.inteface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testimonials',
  standalone: false,
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit {


  testimonials: ITestimonial[] = [];
  constructor(private testimonialsService: TestimonialsService, private toastr: ToastrService) {


  }
  ngOnInit(): void {
    this.loadTestimonials()
  }

  loadTestimonials() {
    this.testimonialsService.getTop4Testimonials().subscribe({
      next: (res) => {
        console.log(res);
        this.testimonials = res.items
      },

      error: (err) => {
        this.toastr.error('فشل تحميل شهادات العملاء')
      },
    })

  }
}
