import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: marker('Login') }
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./register.component').then(m => m.RegisterComponent),
  //   data: { title: marker('Register') }
  // }
];
