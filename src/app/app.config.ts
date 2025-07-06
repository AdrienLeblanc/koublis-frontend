import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '@env/environment';

import { routes } from './app.routes';
import { ApiModule, Configuration } from '@koublis/api-client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { apiPrefixInterceptor, errorHandlerInterceptor } from '@shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiPrefixInterceptor, errorHandlerInterceptor])),
    provideTranslateService({
      defaultLanguage: 'fr',
    }),
    importProvidersFrom(
      ApiModule.forRoot(
        () =>
          new Configuration({
            basePath: environment.apiBasePath,
          }),
      ),
    ),
  ],
};
