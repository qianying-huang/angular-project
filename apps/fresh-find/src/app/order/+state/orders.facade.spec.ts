import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as OrdersActions from './orders.actions';
import { OrdersEffects } from './orders.effects';
import { OrdersFacade } from './orders.facade';
import { OrdersEntity } from '../order.models';
import {
  ORDERS_FEATURE_KEY,
  OrdersState,
  initialOrdersState,
  ordersReducer,
} from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

interface TestSchema {
  orders: OrdersState;
}

describe('OrdersFacade', () => {
  let facade: OrdersFacade;
  let store: Store<TestSchema>;
  const createOrdersEntity = (id: string, name = ''): OrdersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ORDERS_FEATURE_KEY, ordersReducer),
          EffectsModule.forFeature([OrdersEffects]),
        ],
        providers: [OrdersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(OrdersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allOrders$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allOrders$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadOrdersSuccess` to manually update list
     */
    it('allOrders$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allOrders$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        OrdersActions.loadOrdersSuccess({
          orders: [createOrdersEntity('AAA'), createOrdersEntity('BBB')],
        })
      );

      list = await readFirst(facade.allOrders$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
