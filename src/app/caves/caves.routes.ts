import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const CAVES_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: 'caves',
      loadComponent: () => import('./cave-list.component').then((m) => m.CaveListComponent),
      data: { title: marker('Caves') },
    },
    {
      path: 'caves/:caveId',
      loadComponent: () => import('./cave-detail.component').then((m) => m.CaveDetailComponent),
      data: { title: marker('Caves') },
    },
  ]),
];
