import { Injectable, computed, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'koublis-theme';

/**
 * Applique et persiste le thème clair/sombre.
 * Le thème lui-même vit dans styles.scss (mat.theme + color-scheme) ; ce service
 * ne fait que poser l'attribut data-theme sur <html>.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _mode = signal<ThemeMode>(this.read());

  mode = computed(() => this._mode());
  isDark = computed(() => this._mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this._mode();
      document.documentElement.dataset['theme'] = mode;
      localStorage.setItem(STORAGE_KEY, mode);
    });
  }

  set(mode: ThemeMode) {
    this._mode.set(mode);
  }

  toggle() {
    this._mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  private read(): ThemeMode {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
