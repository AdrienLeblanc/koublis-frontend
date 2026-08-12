import { Injectable, inject } from '@angular/core';
import { CatalogWineControllerService, CatalogWineDTO } from '@koublis/api-client';
import { Observable, map } from 'rxjs';

export interface CatalogPage {
  content: CatalogWineDTO[];
  totalElements: number;
}

/** Accès au catalogue Elasticsearch exposé par /catalog/wines/_search. */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private api = inject(CatalogWineControllerService);

  search(query: string, page = 0, size = 20): Observable<CatalogPage> {
    return this.api
      .searchCatalogWines({ query, pageable: { page, size } })
      .pipe(map((result: any) => ({ content: result.content ?? [], totalElements: result.totalElements ?? 0 })));
  }
}
