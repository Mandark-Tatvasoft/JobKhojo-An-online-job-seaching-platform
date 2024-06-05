import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ApiResponseToastrService } from '../services/api-response-toastr.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ApiResponseToastrService);

  const token = localStorage.getItem('jwtToken');
  let request = req;
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        toast.handleResponse(event);
      }
    })
  );
};
