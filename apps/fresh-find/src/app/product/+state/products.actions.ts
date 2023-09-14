import { createAction, props } from '@ngrx/store';
import { IProduct } from '../products.models';

export const loadProducts = createAction('[Products Page] Init');

export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: any }>()
);

export const selectProduct = createAction(
  '[Product Detail] Select Product',
  props<{ id: number }>()
);
export const searchProduct = createAction(
  '[Product Filter] Search Product',
  props<{ query: string }>()
);
