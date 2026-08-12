import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CatalogWineDTO } from '@koublis/api-client';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

import { LoaderComponent } from '@shared';
import { CatalogService } from './catalog.service';
import { AddWineSheetComponent, AddWineSheetResult } from './add-wine-sheet.component';
import { CavesService } from '@app/caves';

@Component({
  selector: 'app-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrl: './catalog-search.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TranslateModule,
    LoaderComponent,
  ],
})
export class CatalogSearchComponent {
  private catalogService = inject(CatalogService);
  private cavesService = inject(CavesService);
  private bottomSheet = inject(MatBottomSheet);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  search = new FormControl('', { nonNullable: true });
  isLoading = signal(false);

  results = toSignal(
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        this.isLoading.set(true);
        return this.catalogService.search(query);
      }),
      takeUntilDestroyed(),
    ),
    { initialValue: { content: [], totalElements: 0 } },
  );

  add(entry?: CatalogWineDTO): void {
    this.bottomSheet
      .open(AddWineSheetComponent, { data: { entry, caves: this.cavesService.caves() } })
      .afterDismissed()
      .subscribe((result?: AddWineSheetResult) => {
        if (!result) {
          return;
        }
        this.cavesService.addWine(result.caveId, result.wine, result.extras).subscribe(() => {
          this.snackBar.open(this.translateService.instant('Added to your cellar'), undefined, {
            duration: 2500,
          });
        });
      });
  }
}
