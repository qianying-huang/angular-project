import { Action } from '@ngrx/store';

import * as CartsActions from './carts.actions';
import { CartsEntity } from '../carts.models';
import { CartsState, initialCartsState, cartsReducer } from './carts.reducer';

describe('Carts Reducer', () => {
  const createCartsEntity = (id: string, name = ''): CartsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Carts actions', () => {
    it('loadCartsSuccess should return the list of known Carts', () => {
      const carts = [
        createCartsEntity('PRODUCT-AAA'),
        createCartsEntity('PRODUCT-zzz'),
      ];
      const action = CartsActions.loadCartsSuccess({ carts });

      const result: CartsState = cartsReducer(initialCartsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = cartsReducer(initialCartsState, action);

      expect(result).toBe(initialCartsState);
    });
  });
});
