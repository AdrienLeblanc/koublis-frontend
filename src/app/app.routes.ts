import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@app/auth/auth.routes';
import { ABOUT_ROUTES } from '@app/about/about.routes';
import { HOME_ROUTES } from '@app/home/home.routes';

export const routes: Routes = [...HOME_ROUTES, ...AUTH_ROUTES, ...ABOUT_ROUTES];
