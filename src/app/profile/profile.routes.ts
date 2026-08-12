import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const PROFILE_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: 'profile',
      loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
      data: { title: marker('Profile') },
    },
  ]),
];
