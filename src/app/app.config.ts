import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { ApiModule, Configuration } from '@koublis/api-client';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService(),
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
