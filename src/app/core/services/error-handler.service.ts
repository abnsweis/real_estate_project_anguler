// error-handler.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }

  handleError(error: any): void {
    let errorMessage = 'حدث خطأ غير متوقع';

    if (error.error?.title) {
      errorMessage = error.error.title;
    } else if (error.message) {
      errorMessage = error.message;
    }

    alert(errorMessage);
  }
}