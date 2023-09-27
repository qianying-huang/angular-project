import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import { IOrder } from '../order.models';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState extends EntityState<IOrder> {
  selectedId?: string | number; // which Orders record has been selected
  loaded: boolean; // has the Orders list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrdersPartialState {
  readonly [ORDERS_FEATURE_KEY]: OrdersState;
}

export const ordersAdapter: EntityAdapter<IOrder> =
  createEntityAdapter<IOrder>();

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialOrdersState,
  on(OrdersActions.initOrders, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, loaded: true })
  ),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(OrdersActions.addOrderSuccess, (state, { order }) =>
    ordersAdapter.addOne(order, state)
  )
);

export function ordersReducer(state: OrdersState | undefined, action: Action) {
  return reducer(state, action);
}
