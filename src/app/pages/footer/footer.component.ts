import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="k-footer">
      My footer
    </footer>
  `,
  styles: `
  .k-footer {
    text-align: center;
    padding: 1em;
    background-color: var(--mat-sys-background);
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 50px;
  }
  `
})
export class FooterComponent {

}
