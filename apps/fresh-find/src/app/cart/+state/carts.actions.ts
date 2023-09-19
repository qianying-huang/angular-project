import { createAction, props } from '@ngrx/store';
import { ICart } from '../carts.models';

export const loadCart = createAction('[Carts Page] Init');

export const loadCartSuccess = createAction(
  '[Carts/API] Load Carts Success',
  props<{ carts: ICart[] }>()
);

export const loadCartFailure = createAction(
  '[Carts/API] Load Carts Failure',
  props<{ error: any }>()
);

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ product: ICart }>()
);

export const addProductToCartSuccess = createAction(
  '[Cart] Add Product Success',
  props<{ product: ICart }>()
);

export const addProductToCartFailure = createAction(
  '[Cart] Add Product Failure',
  props<{ error: any }>()
);
