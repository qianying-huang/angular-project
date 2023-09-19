import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CartsActions from './carts.actions';
import { CartsEffects } from './carts.effects';

describe('CartsEffects', () => {
  let actions: Observable<Action>;
  let effects: CartsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CartsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CartsActions.initCarts() });

      const expected = hot('-a-|', {
        a: CartsActions.loadCartsSuccess({ carts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
