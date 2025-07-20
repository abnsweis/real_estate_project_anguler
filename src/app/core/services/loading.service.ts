import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private activeRequests = 0;


  show() {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0; // Reset to zero to avoid negative counts
      this.loadingSubject.next(false);
    }
  }
}
