import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/auth';

/**
 * Provides helper methods to create routes.
 */
export class Shell {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      // Chargé à la demande : app.routes est eager, un `component` mettrait
      // le shell et ses modules Material dans le bundle initial.
      loadComponent: () => import('./shell.component').then((m) => m.ShellComponent),
      children: routes,
      canActivate: [AuthenticationGuard]
    };
  }
}
