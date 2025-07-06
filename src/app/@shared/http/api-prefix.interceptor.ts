import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  if (!/^(http|https):/i.test(req.url)) {
    req = req.clone({ url: environment.apiBasePath + req.url });
  }
  return next(req);
};
