import { Component, Input, OnInit } from '@angular/core';

import { I18nService } from './i18n.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatIconButton,
    MatButton,
    MatMenu,
    MatMenuItem,
  ],
  template: `
    @if (icon) {
      <button
        *ngIf="icon; else text"
        mat-icon-button
        [matMenuTriggerFor]="languageMenu"
      >
        <mat-icon>language</mat-icon>
      </button>
    } @else {
      <button
        mat-raised-button
        color="primary"
        [matMenuTriggerFor]="languageMenu"
      >
        {{ currentLanguage }}
      </button>
    }

    <mat-menu #languageMenu="matMenu">
      @for (language of languages; track language) {
        <button
          mat-menu-item
          (click)="setLanguage(language)"
        >
          {{ language }}
        </button>
      }
    </mat-menu>
  `,
})
export class LanguageSelectorComponent implements OnInit {
  @Input() icon = false;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
