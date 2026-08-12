import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const DASHBOARD_ROUTES: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadComponent: () => import('./dashboard.component').then((m) => m.DashboardComponent),
      data: { title: marker('Overview') },
    },
  ]),
];
