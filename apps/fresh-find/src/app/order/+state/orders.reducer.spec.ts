import { Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import { OrdersEntity } from '../order.models';
import {
  OrdersState,
  initialOrdersState,
  ordersReducer,
} from './orders.reducer';

describe('Orders Reducer', () => {
  const createOrdersEntity = (id: string, name = ''): OrdersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Orders actions', () => {
    it('loadOrdersSuccess should return the list of known Orders', () => {
      const orders = [
        createOrdersEntity('PRODUCT-AAA'),
        createOrdersEntity('PRODUCT-zzz'),
      ];
      const action = OrdersActions.loadOrdersSuccess({ orders });

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = ordersReducer(initialOrdersState, action);

      expect(result).toBe(initialOrdersState);
    });
  });
});
