import { CartsEntity } from '../carts.models';
import {
  cartsAdapter,
  CartsPartialState,
  initialCartsState,
} from './carts.reducer';
import * as CartsSelectors from './carts.selectors';

describe('Carts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCartsId = (it: CartsEntity) => it.id;
  const createCartsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartsEntity);

  let state: CartsPartialState;

  beforeEach(() => {
    state = {
      carts: cartsAdapter.setAll(
        [
          createCartsEntity('PRODUCT-AAA'),
          createCartsEntity('PRODUCT-BBB'),
          createCartsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCartsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Carts Selectors', () => {
    it('selectAllCarts() should return the list of Carts', () => {
      const results = CartsSelectors.selectAllCarts(state);
      const selId = getCartsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CartsSelectors.selectEntity(state) as CartsEntity;
      const selId = getCartsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCartsLoaded() should return the current "loaded" status', () => {
      const result = CartsSelectors.selectCartsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCartsError() should return the current "error" state', () => {
      const result = CartsSelectors.selectCartsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
