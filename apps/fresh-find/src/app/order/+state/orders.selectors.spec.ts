import { OrdersEntity } from '../order.models';
import {
  ordersAdapter,
  OrdersPartialState,
  initialOrdersState,
} from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

describe('Orders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrdersId = (it: OrdersEntity) => it.id;
  const createOrdersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as OrdersEntity);

  let state: OrdersPartialState;

  beforeEach(() => {
    state = {
      orders: ordersAdapter.setAll(
        [
          createOrdersEntity('PRODUCT-AAA'),
          createOrdersEntity('PRODUCT-BBB'),
          createOrdersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialOrdersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Orders Selectors', () => {
    it('selectAllOrders() should return the list of Orders', () => {
      const results = OrdersSelectors.selectAllOrders(state);
      const selId = getOrdersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = OrdersSelectors.selectEntity(state) as OrdersEntity;
      const selId = getOrdersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectOrdersLoaded() should return the current "loaded" status', () => {
      const result = OrdersSelectors.selectOrdersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectOrdersError() should return the current "error" state', () => {
      const result = OrdersSelectors.selectOrdersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
