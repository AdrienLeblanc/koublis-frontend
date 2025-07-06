import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Logger } from '@shared';
import enUS from '../../translations/en-US.json';
import frFR from '../../translations/fr-FR.json';

const log = new Logger('I18nService');
const languageKey = 'language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translateService = inject(TranslateService);

  private defaultLanguage = signal<string>('');
  private _supportedLanguages = signal<string[]>([]);
  private _currentLanguage = signal<string>('');
  supportedLanguages = computed(() => this._supportedLanguages());
  currentLanguage = computed(() => this._currentLanguage());

  constructor() {
    // Embed languages to avoid extra HTTP requests
    this.translateService.setTranslation('en-US', enUS);
    this.translateService.setTranslation('fr-FR', frFR);

    effect(() => {
      const lang = this._currentLanguage();
      if (lang && this.translateService.currentLang !== lang) {
        this.translateService.use(lang);
      }
    });
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage.set(defaultLanguage);
    this._supportedLanguages.set(supportedLanguages);
    this.language = '';
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    let newLanguage =
      language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang() || '';
    let isSupportedLanguage = this._supportedLanguages().includes(newLanguage);

    // If no exact match is found, search without the region
    if (newLanguage && !isSupportedLanguage) {
      newLanguage = newLanguage.split('-')[0];
      newLanguage =
        this._supportedLanguages().find((supportedLanguage) => supportedLanguage.startsWith(newLanguage)) || '';
      isSupportedLanguage = Boolean(newLanguage);
    }

    // Fallback if language is not supported
    if (!newLanguage || !isSupportedLanguage) {
      newLanguage = this.defaultLanguage();
    }

    log.debug(`Language set to ${newLanguage}`);
    localStorage.setItem(languageKey, newLanguage);
    this._currentLanguage.set(newLanguage);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this._currentLanguage();
  }
}
