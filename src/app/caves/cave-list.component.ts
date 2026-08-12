import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { CavesService } from './caves.service';
import { CaveFormComponent } from './cave-form.component';
import { WINE_COLORS, WINE_COLOR_VAR, WineColor } from '@shared/models';

@Component({
  selector: 'app-cave-list',
  templateUrl: './cave-list.component.html',
  styleUrl: './cave-list.component.scss',
  imports: [MatCardModule, MatButtonModule, MatIconModule, TranslateModule],
})
export class CaveListComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  cavesService = inject(CavesService);

  cards = computed(() =>
    this.cavesService.caves().map((cave) => ({
      id: cave.id!,
      name: cave.name!,
      bottles: this.cavesService.bottles(cave),
      references: (cave.wines ?? []).length,
      bars: WINE_COLORS.map((color) => ({
        color: WINE_COLOR_VAR[color],
        share: this.share(cave.wines ?? [], color),
      })).filter((bar) => bar.share > 0),
    })),
  );

  ngOnInit(): void {
    this.cavesService.load().subscribe();
  }

  open(caveId: string): void {
    this.router.navigate(['/caves', caveId]);
  }

  create(): void {
    this.dialog
      .open(CaveFormComponent, { width: '380px' })
      .afterClosed()
      .subscribe((name?: string) => {
        if (name) {
          this.cavesService.createCave(name).subscribe();
        }
      });
  }

  private share(wines: { color?: string; count?: number }[], color: WineColor): number {
    const total = wines.reduce((sum, wine) => sum + (wine.count ?? 0), 0) || 1;
    const forColor = wines
      .filter((wine) => wine.color === color)
      .reduce((sum, wine) => sum + (wine.count ?? 0), 0);
    return (forColor / total) * 100;
  }
}
