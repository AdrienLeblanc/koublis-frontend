import { Injectable } from '@angular/core';

/** Petit wrapper typé sur localStorage, pour les données que l'API ne porte pas encore. */
@Injectable({ providedIn: 'root' })
export class LocalStoreService {
  read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  write<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota / navigation privée : on ignore volontairement
    }
  }
}
