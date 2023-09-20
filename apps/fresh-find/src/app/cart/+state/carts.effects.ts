import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap } from 'rxjs';
import * as CartsActions from './carts.actions';
import * as CartsFeature from './carts.reducer';

@Injectable()
export class CartsEffects {
  constructor(private actions$: Actions) {}

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
      mergeMap(({ product }) => {
        return of(CartsActions.addProductToCartSuccess({ product }));
      }),
      catchError((error) => {
        return of(CartsActions.addProductToCartFailure({ error }));
      })
    )
  );
}
