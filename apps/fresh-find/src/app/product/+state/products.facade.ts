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

  constructor(private store: Store<ProductsState>) {
    this.allProducts$ = this.store.pipe(
      select(ProductsSelectors.selectAllProducts)
    );
  }

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
