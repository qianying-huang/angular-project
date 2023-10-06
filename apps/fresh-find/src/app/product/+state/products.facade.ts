import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import * as ProductsSelectors from './products.selectors';
import { ProductsState } from './products.reducer';
import { IProduct } from '../products.models';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsFacade {
  public allProducts$: Observable<IProduct[]>;
  public query$: Observable<string>;
  public productId$: Observable<number>;
  public categories$: Observable<string[]>;
  public selectedCategory$: Observable<string>;

  public selectedProduct$: Observable<IProduct | undefined> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProduct)
  );

  constructor(private store: Store<ProductsState>) {
    this.allProducts$ = this.store.pipe(
      select(ProductsSelectors.selectAllProducts)
    );
    this.query$ = this.store.pipe(select(ProductsSelectors.selectQuery));
    this.productId$ = this.store.pipe(
      select(ProductsSelectors.selectSelectedId)
    );
    this.categories$ = this.store.pipe(
      select(ProductsSelectors.selectCategories)
    );
    this.selectedCategory$ = this.store.pipe(
      select(ProductsSelectors.selectSelectedCategory)
    );
  }

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  public loadCategories(): void {
    this.store.dispatch(ProductsActions.loadCategories());
  }
  public selectProduct(id: number): void {
    this.store.dispatch(ProductsActions.selectProduct({ id }));
  }

  public selectCategory(category: string): void {
    this.store.dispatch(ProductsActions.selectCategory({ category }));
  }
  public doSearch(query: string): void {
    this.store.dispatch(ProductsActions.searchProduct({ query }));
  }
}
