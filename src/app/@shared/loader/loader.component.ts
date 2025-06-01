import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div [hidden]="!isLoading">
      <mat-progress-spinner
        mode="indeterminate"
        [strokeWidth]="2"
        [diameter]="32 * size"
      ></mat-progress-spinner>
      <span class="message">{{ message }}</span>
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
  @Input() isLoading = false;
  @Input() size = 1;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
