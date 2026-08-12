import { Injectable, computed, inject, signal } from '@angular/core';

import { LocalStoreService } from '@shared/storage';

export interface WishlistEntry {
  id: string;
  name: string;
  vintage?: number;
  color?: string;
  regions?: string[];
  country?: string;
}

const KEY = 'koublis-wishlist';

/** Envies : stockage local tant qu'aucun endpoint /wishlist n'existe côté API. */
@Injectable({ providedIn: 'root' })
export class WishlistService {
  private store = inject(LocalStoreService);
  private _entries = signal<WishlistEntry[]>(this.store.read<WishlistEntry[]>(KEY, []));

  entries = computed(() => this._entries());

  add(entry: Omit<WishlistEntry, 'id'>): void {
    this.commit([...this._entries(), { ...entry, id: crypto.randomUUID() }]);
  }

  remove(id: string): void {
    this.commit(this._entries().filter((entry) => entry.id !== id));
  }

  private commit(entries: WishlistEntry[]): void {
    this._entries.set(entries);
    this.store.write(KEY, entries);
  }
}
