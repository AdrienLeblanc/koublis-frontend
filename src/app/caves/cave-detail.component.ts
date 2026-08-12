import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import { CavesService } from './caves.service';
import { WINE_COLORS, WINE_COLOR_VAR, WineColor, WineView } from '@shared/models';

@Component({
  selector: 'app-cave-detail',
  templateUrl: './cave-detail.component.html',
  styleUrl: './cave-detail.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    TranslateModule,
  ],
})
export class CaveDetailComponent {
  private readonly route = inject(ActivatedRoute);

  cavesService = inject(CavesService);
  colors = WINE_COLORS;
  colorFilter = signal<WineColor | 'all'>('all');
  query = signal('');

  caveId = toSignal(this.route.paramMap.pipe(map((params) => params.get('caveId') ?? '')), {
    initialValue: '',
  });

  cave = computed(() => this.cavesService.cave(this.caveId())());

  wines = computed<WineView[]>(() => {
    const all = this.cavesService.wines(this.caveId())();
    const color = this.colorFilter();
    const query = this.query().trim().toLowerCase();

    return all
      .filter((wine) => color === 'all' || wine.color === color)
      .filter(
        (wine) =>
          !query || [wine.name, wine.vintage, (wine.regions ?? []).join(' ')].join(' ').toLowerCase().includes(query),
      );
  });

  swatch(color?: string): string {
    return WINE_COLOR_VAR[(color as WineColor) ?? 'red'] ?? 'var(--mat-sys-outline)';
  }

  changeCount(wine: WineView, delta: number): void {
    this.cavesService.setCount(this.caveId(), wine, (wine.count ?? 0) + delta).subscribe();
  }
}
