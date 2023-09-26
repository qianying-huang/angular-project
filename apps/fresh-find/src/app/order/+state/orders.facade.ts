import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

@Injectable()
export class OrdersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(OrdersSelectors.selectOrdersLoaded));
  allOrders$ = this.store.pipe(select(OrdersSelectors.selectAllOrders));
  selectedOrders$ = this.store.pipe(select(OrdersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(OrdersActions.initOrders());
  }
}
