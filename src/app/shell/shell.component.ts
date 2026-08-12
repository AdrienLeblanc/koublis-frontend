import { Title } from '@angular/platform-browser';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { LanguageSelectorComponent } from '@app/i18n';
import { ThemeService } from '@shared/theme';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  /** Affiché aussi dans la barre d'onglets mobile. */
  tab: boolean;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    LanguageSelectorComponent,
    TranslateModule,
    RouterModule,
  ],
})
export class ShellComponent {
  private router = inject(Router);
  private titleService = inject(Title);
  private authenticationService = inject(AuthenticationService);
  private credentialsService = inject(CredentialsService);
  private breakpoint = inject(BreakpointObserver);

  themeService = inject(ThemeService);

  private _isMobile = signal(false);
  private _title = signal(this.titleService.getTitle());

  isMobile = computed(() => this._isMobile());
  username = computed(() => this.credentialsService.credentials()?.username);
  title = computed(() => this._title());

  navItems: NavItem[] = [
    { path: '/dashboard', icon: 'grid_view', label: 'Overview', tab: true },
    { path: '/caves', icon: 'inventory_2', label: 'Caves', tab: true },
    { path: '/catalog', icon: 'search', label: 'Catalog', tab: true },
    { path: '/wishlist', icon: 'favorite', label: 'Wishlist', tab: true },
    { path: '/profile', icon: 'person', label: 'Profile', tab: false },
  ];

  tabItems = this.navItems.filter((item) => item.tab);

  constructor() {
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this._isMobile.set(result.matches));

    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      this._title.set(this.titleService.getTitle());
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
