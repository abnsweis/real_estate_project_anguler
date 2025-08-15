import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loading } from './loading/loading';
import { Star } from './star/star';


@NgModule({
  declarations: [Star, Loading],
  imports: [
    CommonModule
  ],
  exports: [
    Star,
    Loading
  ]
})
export class SharedModule { }
