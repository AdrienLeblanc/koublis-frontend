import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cave-form',
  template: `
    <h2 mat-dialog-title class="kb-display" translate>New collection</h2>
    <mat-dialog-content>
      <mat-form-field class="kb-full">
        <mat-label translate>Collection name</mat-label>
        <input matInput [ngModel]="name()" (ngModelChange)="name.set($any($event))" cdkFocusInitial />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close translate>Cancel</button>
      <button mat-flat-button [disabled]="!name().trim()" [mat-dialog-close]="name().trim()" translate>Save</button>
    </mat-dialog-actions>
  `,
  styles: `.kb-full { width: 100%; }`,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule],
})
export class CaveFormComponent {
  dialogRef = inject<MatDialogRef<CaveFormComponent, string>>(MatDialogRef);
  name = signal('');
}
