import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CartsActions from './carts.actions';
import { ICart } from '../carts.models';

export const CARTS_FEATURE_KEY = 'carts';

export interface CartsState extends EntityState<ICart> {
  selectedId?: string | number; // which Carts record has been selected
  loaded: boolean; // has the Carts list been loaded
  error?: string | null; // last known error (if any)
  amountBeforeTax: number;
  cartCount: number;
}

export interface CartsPartialState {
  readonly [CARTS_FEATURE_KEY]: CartsState;
}

export const cartsAdapter: EntityAdapter<ICart> = createEntityAdapter<ICart>();

export const initialCartsState: CartsState = cartsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  amountBeforeTax: 0,
  cartCount: 0,
});

const reducer = createReducer(
  initialCartsState,
  on(CartsActions.loadCart, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CartsActions.loadCartSuccess, (state, { carts }) =>
    cartsAdapter.setAll(carts, { ...state, loaded: true })
  ),
  on(CartsActions.loadCartFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CartsActions.addProductToCartSuccess, (state, { product }) =>
    cartsAdapter.addOne(product, { ...state, cartCount: state.cartCount + 1 })
  )
);

export function cartsReducer(state: CartsState | undefined, action: Action) {
  return reducer(state, action);
}
