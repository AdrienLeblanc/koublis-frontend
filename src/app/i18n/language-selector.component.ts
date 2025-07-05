import { Component, inject, Input, OnInit } from '@angular/core';

import { I18nService } from './i18n.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-language-selector',
  imports: [MatIcon, MatMenuTrigger, MatIconButton, MatButton, MatMenu, MatMenuItem],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent implements OnInit {
  @Input() icon = false;

  i18nService = inject(I18nService);

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
