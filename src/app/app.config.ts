import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '@env/environment';

import { routes } from './app.routes';
import { Configuration } from '@koublis/api-client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { apiPrefixInterceptor, errorHandlerInterceptor } from '@shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiPrefixInterceptor, errorHandlerInterceptor])),
    provideTranslateService(),
    // Équivalent de `ApiModule.forRoot()`, sans passer par l'interop NgModule :
    // les services du client sont `providedIn: 'root'` et n'ont besoin que de la Configuration.
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: environment.apiBasePath,
        }),
    },
  ],
};
