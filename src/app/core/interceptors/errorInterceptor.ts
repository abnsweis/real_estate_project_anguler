import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {

      if (error.status === 401 || error.status === 403) {
        router.navigateByUrl('/auth/login');
      }

      return throwError(() => error);
    })
  );
};
