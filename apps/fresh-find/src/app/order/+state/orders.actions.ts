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
