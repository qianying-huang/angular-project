import { createAction, props } from '@ngrx/store';
import { IOrder } from '../order.models';

export const initOrders = createAction('[Orders Page] Init');

export const loadOrdersSuccess = createAction(
  '[Orders/API] Load Orders Success',
  props<{ orders: IOrder[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders/API] Load Orders Failure',
  props<{ error: any }>()
);

export const addOrder = createAction(
  '[Cart] Add Order',
  props<{ order: IOrder }>()
);

export const addOrderSuccess = createAction(
  '[Cart] Add Order Success',
  props<{ order: IOrder }>()
);

export const addOrderFailure = createAction(
  '[Cart] Add Order Failure',
  props<{ error: any }>()
);
