import { createAction, props } from '@ngrx/store';
import { IProduct } from '../products.models';

export const loadProducts = createAction('[Products Page] Load products');

export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: any }>()
);

export const loadCategories = createAction('[Products Page] Load categories');

export const loadCategoriesSuccess = createAction(
  '[Products Page] Load categories success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Products Page] Load categories failure',
  props<{ error: any }>()
);

export const selectProduct = createAction(
  '[Product Detail] Select Product',
  props<{ id: number }>()
);

export const selectProductSuccess = createAction(
  '[Product Detail] Select Product success',
  props<{ selectedProduct: IProduct }>()
);

export const selectProductFailure = createAction(
  '[Product Detail] Select Product failure',
  props<{ error: any }>()
);

export const selectCategory = createAction(
  '[Product Detail] Select Category',
  props<{ category: string }>()
);
export const searchProduct = createAction(
  '[Product Filter] Search Product',
  props<{ query: string }>()
);
