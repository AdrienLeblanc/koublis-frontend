import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@app/auth';
import { ABOUT_ROUTES } from '@app/about';
import { DASHBOARD_ROUTES } from '@app/dashboard';
import { CAVES_ROUTES } from '@app/caves';
import { CATALOG_ROUTES } from '@app/catalog';
import { WISHLIST_ROUTES } from '@app/wishlist';
import { PROFILE_ROUTES } from '@app/profile';

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...CAVES_ROUTES,
  ...CATALOG_ROUTES,
  ...WISHLIST_ROUTES,
  ...PROFILE_ROUTES,
  ...ABOUT_ROUTES,
];
