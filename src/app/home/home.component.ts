import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: `
    .container {
      text-align: center;
      padding: 1em;
    }
  `,
  imports: [MatCardModule, LoaderComponent],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
  }
}
