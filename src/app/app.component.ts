import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AuthControllerService,
  WineControllerService,
} from '@koublis/api-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koublis-frontend';

  constructor(
    authControllerService: AuthControllerService,
    wineControllerService: WineControllerService,
  ) {}
}
