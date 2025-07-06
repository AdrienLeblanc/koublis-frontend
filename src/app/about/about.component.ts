import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="d-flex flex-column align-items-center">
      <h1>
        <mat-card-title translate>APP_NAME</mat-card-title>
      </h1>
      <mat-card-content class="d-flex align-items-center gap-1">
        <mat-icon>code</mat-icon>
        <span translate>Version</span> {{ version }}
      </mat-card-content>
    </div>
  `,
  imports: [MatCardModule, MatIconModule, TranslateModule],
  styles: `
    .mat-icon {
      //vertical-align: text-bottom;
    }
  `,
})
export class AboutComponent implements OnInit {
  version: string | undefined = environment.version;

  ngOnInit() {}
}
