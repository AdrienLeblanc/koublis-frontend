import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { WishlistEntry, WishlistService } from './wishlist.service';
import { WINE_COLOR_VAR, WineColor } from '@shared/models';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, TranslateModule],
})
export class WishlistComponent {
  private router = inject(Router);

  wishlistService = inject(WishlistService);

  swatch(color?: string): string {
    return WINE_COLOR_VAR[(color as WineColor) ?? 'red'] ?? 'var(--mat-sys-outline)';
  }

  moveToCellar(entry: WishlistEntry): void {
    this.router.navigate(['/catalog'], { queryParams: { q: entry.name } });
  }
}
