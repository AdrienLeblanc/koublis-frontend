import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

/**
 * Adds a default error handler to all requests.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (!environment.production) {
        console.error('Request error', error);
      }
      throw error;
    }),
  );
};
