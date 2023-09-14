import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import * as ProductsSelectors from './products.selectors';
import { ProductsState } from './products.reducer';
import { IProduct } from '../products.models';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsFacade {
  public allProducts$: Observable<IProduct[]>;
  public filteredProducts$: Observable<IProduct[]>;

  public selectedProduct$: Observable<IProduct | undefined> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProduct)
  );

  constructor(private store: Store<ProductsState>) {
    this.allProducts$ = this.store.pipe(
      select(ProductsSelectors.selectAllProducts)
    );
    this.filteredProducts$ = this.store.pipe(
      select(ProductsSelectors.selectFilteredProducts)
    );
  }

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  public selectProduct(id: number): void {
    this.store.dispatch(ProductsActions.selectProduct({ id }));
  }

  public doSearch(query: string): void {
    this.store.dispatch(ProductsActions.searchProduct({ query }));
  }
}
