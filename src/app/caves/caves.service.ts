import { Injectable, computed, inject, signal } from '@angular/core';
import { CaveControllerService, CaveDTO, WineControllerService, WineDTO } from '@koublis/api-client';
import { Observable, tap } from 'rxjs';

import { LocalStoreService } from '@shared/storage';
import { WineExtras, WineView } from '@shared/models';

const EXTRAS_KEY = 'koublis-wine-extras';

/**
 * État des caves : source de vérité côté client, alimentée par l'API.
 * Les composants lisent les signals, les actions passent par les méthodes.
 */
@Injectable({ providedIn: 'root' })
export class CavesService {
  private caveApi = inject(CaveControllerService);
  private wineApi = inject(WineControllerService);
  private store = inject(LocalStoreService);

  private _caves = signal<CaveDTO[]>([]);
  private _extras = signal<Record<string, WineExtras>>(this.store.read(EXTRAS_KEY, {}));
  private _loading = signal(false);

  caves = computed(() => this._caves());
  loading = computed(() => this._loading());

  totalBottles = computed(() =>
    this._caves().reduce((total, cave) => total + this.bottles(cave), 0),
  );

  cave(caveId: string) {
    return computed(() => this._caves().find((cave) => cave.id === caveId));
  }

  wines(caveId: string) {
    return computed<WineView[]>(() => {
      const cave = this._caves().find((item) => item.id === caveId);
      const extras = this._extras();
      return (cave?.wines ?? []).map((wine) => ({ ...wine, ...(extras[wine.id!] ?? {}) }));
    });
  }

  bottles(cave: CaveDTO): number {
    return (cave.wines ?? []).reduce((total, wine) => total + (wine.count ?? 0), 0);
  }

  load(): Observable<CaveDTO[]> {
    this._loading.set(true);
    return this.caveApi.findAllCaves().pipe(
      tap({
        next: (caves) => this._caves.set(caves),
        finalize: () => this._loading.set(false),
      }),
    );
  }

  createCave(caveName: string): Observable<CaveDTO> {
    return this.caveApi.createCave({ caveName }).pipe(
      tap((cave) => this._caves.update((caves) => [...caves, cave])),
    );
  }

  renameCave(caveId: string, caveName: string): Observable<CaveDTO> {
    return this.caveApi.updateCave({ caveId, caveName }).pipe(
      tap((updated) => this.replaceCave(updated)),
    );
  }

  deleteCave(caveId: string): Observable<unknown> {
    return this.caveApi.deleteCave({ caveId }).pipe(
      tap(() => this._caves.update((caves) => caves.filter((cave) => cave.id !== caveId))),
    );
  }

  addWine(caveId: string, wine: WineDTO, extras: WineExtras): Observable<WineDTO> {
    return this.wineApi.createWine({ caveId, wineDTO: wine }).pipe(
      tap((created) => {
        this.setExtras(created.id!, extras);
        this._caves.update((caves) =>
          caves.map((cave) =>
            cave.id === caveId ? { ...cave, wines: [created, ...(cave.wines ?? [])] } : cave,
          ),
        );
      }),
    );
  }

  setCount(caveId: string, wine: WineDTO, count: number): Observable<unknown> {
    if (count <= 0) {
      return this.removeWine(caveId, wine.id!);
    }
    return this.wineApi
      .updateWine({ caveId, wineId: wine.id!, wineDTO: { ...wine, count } })
      .pipe(tap((updated) => this.replaceWine(caveId, updated)));
  }

  removeWine(caveId: string, wineId: string): Observable<unknown> {
    return this.wineApi.deleteWine({ caveId, wineId }).pipe(
      tap(() => {
        this._caves.update((caves) =>
          caves.map((cave) =>
            cave.id === caveId
              ? { ...cave, wines: (cave.wines ?? []).filter((wine) => wine.id !== wineId) }
              : cave,
          ),
        );
      }),
    );
  }

  extrasOf(wineId: string): WineExtras {
    return this._extras()[wineId] ?? {};
  }

  setExtras(wineId: string, extras: WineExtras): void {
    const next = { ...this._extras(), [wineId]: { ...this._extras()[wineId], ...extras } };
    this._extras.set(next);
    this.store.write(EXTRAS_KEY, next);
  }

  private replaceCave(updated: CaveDTO): void {
    this._caves.update((caves) => caves.map((cave) => (cave.id === updated.id ? updated : cave)));
  }

  private replaceWine(caveId: string, updated: WineDTO): void {
    this._caves.update((caves) =>
      caves.map((cave) =>
        cave.id === caveId
          ? { ...cave, wines: (cave.wines ?? []).map((wine) => (wine.id === updated.id ? updated : wine)) }
          : cave,
      ),
    );
  }
}
