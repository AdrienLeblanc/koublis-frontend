import { Title } from '@angular/platform-browser';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { LanguageSelectorComponent } from '@app/i18n';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatCard } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    LanguageSelectorComponent,
    TranslateModule,
    RouterModule,
    MatButtonModule,
    MatCard,
  ],
})
export class ShellComponent implements OnInit {
  private router = inject(Router);
  private titleService = inject(Title);
  private authenticationService = inject(AuthenticationService);
  private credentialsService = inject(CredentialsService);
  private breakpoint = inject(BreakpointObserver);

  private _isMobile = signal(false);
  private _title = signal(this.titleService.getTitle());

  isMobile = computed(() => this._isMobile());
  username = computed(() => this.credentialsService.credentials()?.username);
  title = computed(() => this._title());

  constructor() {
    this.breakpoint
        .observe([Breakpoints.Small, Breakpoints.XSmall])
        .pipe(takeUntilDestroyed())
        .subscribe((result) => {
          this._isMobile.set(result.matches);
        });

    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      this._title.set(this.titleService.getTitle());
    });
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
