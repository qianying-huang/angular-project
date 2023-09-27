import { loadCart } from './../../cart/+state/carts.actions';
import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';
import { ProductsState } from '../../product/+state/products.reducer';
import { Observable } from 'rxjs';
import { IOrder } from '../order.models';

@Injectable()
export class OrdersFacade {
  public allOrders$: Observable<IOrder[]>;

  constructor(private store: Store<ProductsState>) {
    this.allOrders$ = this.store.pipe(select(OrdersSelectors.selectAllOrders));
  }

  loaded$ = this.store.pipe(select(OrdersSelectors.selectOrdersLoaded));

  selectedOrders$ = this.store.pipe(select(OrdersSelectors.selectEntity));

  public loadOrders(): void {
    this.store.dispatch(OrdersActions.initOrders());
  }

  public addOrder(order: IOrder) {
    this.store.dispatch(OrdersActions.addOrder({ order }));
  }
}
