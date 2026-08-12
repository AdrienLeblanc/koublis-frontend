import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login.component').then((m) => m.LoginComponent),
    data: { title: marker('Login') }
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./register.component').then(m => m.RegisterComponent),
  //   data: { title: marker('Register') }
  // }
];
