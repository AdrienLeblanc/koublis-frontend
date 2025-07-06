import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [MatCardModule, LoaderComponent],
})
export class HomeComponent implements OnInit {
  isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);
  }
}
