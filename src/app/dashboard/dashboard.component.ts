import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { CavesService } from '@app/caves';
import { LoaderComponent } from '@shared';
import { WINE_COLORS, WINE_COLOR_VAR, WineColor } from '@shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, TranslateModule, LoaderComponent],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);

  cavesService = inject(CavesService);

  private wines = computed(() =>
    this.cavesService.caves().flatMap((cave) =>
      (cave.wines ?? []).map((wine) => ({ ...wine, caveId: cave.id!, caveName: cave.name! })),
    ),
  );

  totalBottles = computed(() => this.wines().reduce((total, wine) => total + (wine.count ?? 0), 0));

  breakdown = computed(() => {
    const total = this.totalBottles() || 1;
    return WINE_COLORS.map((color: WineColor) => {
      const count = this.wines()
        .filter((wine) => wine.color === color)
        .reduce((sum, wine) => sum + (wine.count ?? 0), 0);
      return { color, count, share: (count / total) * 100, swatch: WINE_COLOR_VAR[color] };
    }).filter((entry) => entry.count > 0);
  });

  recent = computed(() => this.wines().slice(0, 4));

  ngOnInit(): void {
    this.cavesService.load().subscribe();
  }

  openCave(caveId: string): void {
    this.router.navigate(['/caves', caveId]);
  }

  openCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
