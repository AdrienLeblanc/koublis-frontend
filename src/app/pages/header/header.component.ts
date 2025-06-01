import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="k-header">
      My header
    </header>
  `,
  styles: `
    .k-header {
      text-align: center;
      padding: 1em;
      background-color: var(--mat-sys-inverse-primary);
      width: 100%;
      position: fixed;
      top: 0;
      height: 50px;
    }
  `
})
export class HeaderComponent {

}
