import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  template: `
    <nav class="k-navigation">
      my Navigation
    </nav>
  `,
  styles: `
    .k-navigation {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 200px;
      background-color: var(--mat-sys-secondary);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1em;
      box-sizing: border-box;
    }
  `
})
export class NavigationComponent {

}
