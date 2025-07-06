import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: `
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
