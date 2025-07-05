import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const HOME_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
      data: { title: marker('Home') },
    }
  ]),
];
