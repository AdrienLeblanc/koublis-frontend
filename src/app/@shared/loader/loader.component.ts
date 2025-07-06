import { Component, computed, input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  template: `
    <div [hidden]="!isLoading()">
      <mat-progress-spinner mode="indeterminate" [strokeWidth]="2" [diameter]="diameter()"></mat-progress-spinner>
      <span class="message">{{ message() }}</span>
    </div>
  `,
  styles: `
    .mat-progress-spinner {
      display: inline-block;
      vertical-align: middle;
    }

    .message {
      margin-left: 0.5em;
    }
  `,
})
export class LoaderComponent implements OnInit {
  isLoading = input(false);
  size = input(1);
  message = input<string | undefined>(undefined);

  diameter = computed(() => 32 * this.size());

  constructor() {}

  ngOnInit() {}
}
