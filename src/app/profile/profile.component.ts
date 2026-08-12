import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from '@env/environment';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { I18nService } from '@app/i18n';
import { ThemeService, ThemeMode } from '@shared/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [MatButtonToggleModule, MatButtonModule, MatIconModule, MatDividerModule, TranslateModule],
})
export class ProfileComponent {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private credentialsService = inject(CredentialsService);

  i18nService = inject(I18nService);
  themeService = inject(ThemeService);

  version = environment.version;
  apiBasePath = environment.apiBasePath;

  username = computed(() => this.credentialsService.credentials()?.username ?? '');
  initials = computed(() => this.username().slice(0, 2).toUpperCase());

  setTheme(mode: ThemeMode): void {
    this.themeService.set(mode);
  }

  setLanguage(language: string): void {
    this.i18nService.language = language;
  }

  logout(): void {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
