import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CartsActions from './carts.actions';
import * as CartsFeature from './carts.reducer';
import * as CartsSelectors from './carts.selectors';
import { CartsState } from './carts.reducer';
import { IProduct } from '../../product/products.models';
import { Observable } from 'rxjs';
import { ICart } from '../carts.models';

@Injectable()
export class CartsFacade {
  public cartProducts$: Observable<ICart[]>;

  constructor(private store: Store<CartsState>) {
    this.cartProducts$ = this.store.pipe(
      select(CartsSelectors.selectAllCartProducts)
    );
  }

  public addProductToCart(product: IProduct): void {
    this.store.dispatch(CartsActions.addProductToCart({ product }));
  }
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CartsSelectors.selectCartsLoaded));

  selectedCarts$ = this.store.pipe(select(CartsSelectors.selectEntity));

  public loadCart(): void {
    this.store.dispatch(CartsActions.loadCart());
  }
}
