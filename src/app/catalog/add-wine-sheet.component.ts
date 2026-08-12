import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogWineDTO, CaveDTO, WineDTO } from '@koublis/api-client';

import { WINE_COLORS, WineExtras } from '@shared/models';

export interface AddWineSheetData {
  entry?: CatalogWineDTO;
  caves: CaveDTO[];
}

export interface AddWineSheetResult {
  caveId: string;
  wine: WineDTO;
  extras: WineExtras;
}

/**
 * Feuille d'ajout : pré-remplie depuis le catalogue, éditable, ou vide pour une saisie manuelle.
 */
@Component({
  selector: 'app-add-wine-sheet',
  templateUrl: './add-wine-sheet.component.html',
  styleUrl: './add-wine-sheet.component.scss',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, TranslateModule],
})
export class AddWineSheetComponent {
  private formBuilder = inject(FormBuilder);
  private sheetRef = inject<MatBottomSheetRef<AddWineSheetComponent, AddWineSheetResult>>(MatBottomSheetRef);

  data = inject<AddWineSheetData>(MAT_BOTTOM_SHEET_DATA);
  colors = WINE_COLORS;

  form = this.formBuilder.nonNullable.group({
    caveId: [this.data.caves[0]?.id ?? '', Validators.required],
    name: [this.title(), Validators.required],
    count: [1, [Validators.required, Validators.min(1)]],
    vintage: [this.vintage()],
    color: ['red'],
    country: [this.data.entry?.country ?? ''],
    regions: [this.data.entry?.region1 ?? ''],
    classification: [this.data.entry?.designation ?? ''],
    slot: [''],
    price: [this.data.entry?.price ?? null],
    peak: [''],
    notes: [''],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const wine: WineDTO = {
      name: value.name,
      count: Number(value.count),
      vintage: value.vintage ? Number(value.vintage) : undefined,
      color: value.color,
      country: value.country,
      regions: value.regions ? value.regions.split(/\s*[,·]\s*/).filter(Boolean) : [],
      classification: value.classification,
      primeur: false,
    };

    const extras: WineExtras = {
      slot: value.slot || undefined,
      price: value.price ? Number(value.price) : undefined,
      peak: value.peak || undefined,
      notes: value.notes || undefined,
    };

    this.sheetRef.dismiss({ caveId: value.caveId, wine, extras });
  }

  cancel(): void {
    this.sheetRef.dismiss();
  }

  private title(): string {
    return (this.data.entry?.title ?? '').replace(/\s*\d{4}\s*$/, '').trim();
  }

  private vintage(): number | null {
    const match = (this.data.entry?.title ?? '').match(/\d{4}/);
    return match ? Number(match[0]) : null;
  }
}
