import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CartActions from './carts.actions';
import * as CartsFeature from './carts.reducer';
import * as CartSelectors from './carts.selectors';
import { CartState } from './carts.reducer';
import { Observable, map } from 'rxjs';
import { ICart } from '../carts.models';

@Injectable()
export class CartsFacade {
  public cartProducts$: Observable<ICart[]>;
  public cartCount$: Observable<number>;
  public amountBeforeTax$: Observable<number>;
  public tax$: Observable<number>;
  public totalAmount$: Observable<number>;

  constructor(private store: Store<CartState>) {
    this.cartProducts$ = this.store.pipe(
      select(CartSelectors.selectCartProducts)
    );
    this.cartCount$ = this.cartProducts$.pipe(
      map((products) => this.calculateCartCount(products))
    );
    this.amountBeforeTax$ = this.store.pipe(
      select(CartSelectors.selectAmountBeforeTax)
    );
    this.tax$ = this.store.pipe(select(CartSelectors.selectTax));
    this.totalAmount$ = this.store.pipe(
      select(CartSelectors.selectTotalAmount)
    );
  }

  public addProductToCart(product: ICart): void {
    this.store.dispatch(CartActions.addProductToCart({ product }));
  }

  loaded$ = this.store.pipe(select(CartSelectors.selectCartLoaded));

  public loadCart(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  private calculateCartCount(productsInCart: ICart[]): number {
    return productsInCart.reduce((sum, product) => sum + product.quantity, 0); //accumulator + currentValue, initialValue
  }

  public updateProductQuantity(productId: number, newQuantity: number): void {
    const updatedProduct: ICart = {
      id: productId,
      quantity: newQuantity,
    };

    this.store.dispatch(
      CartActions.updateProductQuantity({ product: updatedProduct })
    );
  }

  public deleteProductFromCart(productId: number): void {
    this.store.dispatch(CartActions.deleteProductFromCart({ productId }));
  }

  public clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
