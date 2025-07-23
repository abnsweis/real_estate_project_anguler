import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  var authServic = inject(AuthService);

  var request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authServic.getToken()}`
    }
  });



  return next(request);
};
