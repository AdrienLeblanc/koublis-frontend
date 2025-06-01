import { Component } from '@angular/core';
import { Logger } from '@shared';
import { filter, map, merge, switchMap } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@app/i18n';
import { environment } from '@env/environment';
import { FooterComponent } from '@app/pages/footer/footer.component';
import { HeaderComponent } from '@app/pages/header/header.component';
import { NavigationComponent } from '@app/pages/navigation/navigation.component';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NavigationComponent,
  ],
  template: `
    <main>
      <app-header></app-header>
      <section>
        <router-outlet />
        <app-navigation />
      </section>
    </main>

    <app-footer />
  `,
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages,
    );

    const onNavigationEnd = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    );

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
