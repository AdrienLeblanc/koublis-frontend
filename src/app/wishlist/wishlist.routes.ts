import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const WISHLIST_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: 'wishlist',
      loadComponent: () => import('./wishlist.component').then((m) => m.WishlistComponent),
      data: { title: marker('Wishlist') },
    },
  ]),
];
