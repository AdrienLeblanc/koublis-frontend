import { Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
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

  private quoteService = inject(QuoteService);

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
}
