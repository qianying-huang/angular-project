import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      switchMap(() => of(OrdersActions.loadOrdersSuccess({ orders: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(OrdersActions.loadOrdersFailure({ error }));
      })
    )
  );
}
