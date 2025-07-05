import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { AuthControllerService } from '@koublis/api-client';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  credentialsService = inject(CredentialsService);
  authControllerService = inject(AuthControllerService);

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.authControllerService.authenticateUser({ loginRequest: context }).pipe(
      tap((credentials) => this.credentialsService.setCredentials(credentials, context.remember)),
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
