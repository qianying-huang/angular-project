import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OrdersActions from './orders.actions';
import { OrdersEffects } from './orders.effects';

describe('OrdersEffects', () => {
  let actions: Observable<Action>;
  let effects: OrdersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OrdersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(OrdersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: OrdersActions.initOrders() });

      const expected = hot('-a-|', {
        a: OrdersActions.loadOrdersSuccess({ orders: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
