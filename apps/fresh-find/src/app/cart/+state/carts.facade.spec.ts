import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as CartsActions from './carts.actions';
import { CartsEffects } from './carts.effects';
import { CartsFacade } from './carts.facade';
import { CartsEntity } from '../carts.models';
import {
  CARTS_FEATURE_KEY,
  CartsState,
  initialCartsState,
  cartsReducer,
} from './carts.reducer';
import * as CartsSelectors from './carts.selectors';

interface TestSchema {
  carts: CartsState;
}

describe('CartsFacade', () => {
  let facade: CartsFacade;
  let store: Store<TestSchema>;
  const createCartsEntity = (id: string, name = ''): CartsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CARTS_FEATURE_KEY, cartsReducer),
          EffectsModule.forFeature([CartsEffects]),
        ],
        providers: [CartsFacade],
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
      facade = TestBed.inject(CartsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCarts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCarts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCartsSuccess` to manually update list
     */
    it('allCarts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCarts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CartsActions.loadCartsSuccess({
          carts: [createCartsEntity('AAA'), createCartsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCarts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
