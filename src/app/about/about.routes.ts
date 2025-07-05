import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const ABOUT_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadComponent: () => import('./about.component').then((m) => m.AboutComponent),
      data: { title: marker('About') },
    },
  ]),
];
