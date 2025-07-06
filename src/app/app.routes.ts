import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@app/auth';
import { ABOUT_ROUTES } from '@app/about';
import { HOME_ROUTES } from '@app/home';

export const routes: Routes = [...AUTH_ROUTES, ...HOME_ROUTES, ...ABOUT_ROUTES];
