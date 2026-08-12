import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';

export const CATALOG_ROUTES: Routes = [
  Shell.childRoutes([
    {
      path: 'catalog',
      loadComponent: () => import('./catalog-search.component').then((m) => m.CatalogSearchComponent),
      data: { title: marker('Catalog') },
    },
  ]),
];
