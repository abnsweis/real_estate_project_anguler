import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrl: './loading.css',
  standalone: false
})
export class Loading {

  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.loading$;

}
