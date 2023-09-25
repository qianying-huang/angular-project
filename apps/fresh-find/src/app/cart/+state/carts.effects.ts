import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, withLatestFrom } from 'rxjs';
import * as CartsActions from './carts.actions';
import * as CartsFeature from './carts.reducer';
import { CartsFacade } from './carts.facade';
import { ICart } from '../carts.models';
import { ProductsFacade } from '../../product/+state/products.facade';
import { IProduct } from '../../product/products.models';

@Injectable()
export class CartsEffects {
  constructor(
    private actions$: Actions,
    private cartFacade: CartsFacade,
    private productFacade: ProductsFacade
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartsActions.loadCart),
      switchMap(() => of(CartsActions.loadCartSuccess({ carts: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(CartsActions.loadCartFailure({ error }));
      })
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartsActions.addProductToCart),
      withLatestFrom(this.cartFacade.cartProducts$),
      mergeMap(([action, cartProducts]) => {
        const existingProduct = cartProducts.find(
          (p) => p.id === action.product.id
        );
        if (existingProduct) {
          // update the existing product's quantity
          const updatedProduct: ICart = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };
          return of(
            CartsActions.updateProductQuantity({ product: updatedProduct })
          );
        } else {
          // add new product to cart
          return of(
            CartsActions.addProductToCartSuccess({ product: action.product })
          );
        }
      }),
      catchError((error) => {
        return of(CartsActions.addProductToCartFailure({ error }));
      })
    )
  );
  updateAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartsActions.addProductToCartSuccess,
        CartsActions.updateProductQuantity
      ),
      withLatestFrom(
        this.cartFacade.cartProducts$,
        this.productFacade.allProducts$
      ),
      mergeMap(([, cartProducts, allProducts]) => {
        const amountBeforeTax = this.calculateAmountBeforeTax(
          cartProducts,
          allProducts
        );
        const taxRate = 0.13;
        const tax = amountBeforeTax * taxRate;
        const totalAmount = amountBeforeTax + tax;

        return of(
          CartsActions.updateAmount({
            amountBeforeTax,
            tax,
            totalAmount,
          })
        );
      })
    )
  );

  private calculateAmountBeforeTax(
    cartProducts: ICart[],
    allProducts: IProduct[]
  ): number {
    return cartProducts.reduce((total, product) => {
      const productInfo = allProducts.find((p) => p.id === product.id);
      return total + (productInfo ? productInfo.price * product.quantity : 0);
    }, 0);
  }
}
