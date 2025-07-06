import { Title } from '@angular/platform-browser';
import { Component, computed, inject, OnInit } from '@angular/core';
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

  username = computed(() => this.credentialsService.credentials()?.username);

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
