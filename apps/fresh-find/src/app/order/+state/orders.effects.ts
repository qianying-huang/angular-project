import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, map } from 'rxjs';
import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';
import { ProductService } from '../../product/product.service';
import { OrderService } from '../order.service';

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.addOrder),
      switchMap(({ order }) =>
        this.orderService.addOrder(order).pipe(
          map((order) => OrdersActions.addOrderSuccess({ order })),
          catchError((error) => of(OrdersActions.addOrderFailure({ error })))
        )
      )
    )
  );
}
