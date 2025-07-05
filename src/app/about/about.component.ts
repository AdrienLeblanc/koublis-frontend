import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  template: `
    <div class="container">
      <mat-card>
        <h1>
          <mat-card-title translate>APP_NAME</mat-card-title>
        </h1>
        <mat-card-content>
          <mat-icon>code</mat-icon>
          <span translate>Version</span> {{ version }}
        </mat-card-content>
      </mat-card>
    </div>
  `,
  imports: [MatCardModule, MatIconModule],
  styles: `
    .container {
      text-align: center;
      padding: 1rem;
    }

    .mat-icon {
      vertical-align: middle;
    }
  `,
})
export class AboutComponent implements OnInit {
  version: string | undefined = environment.version;

  ngOnInit() {}
}
