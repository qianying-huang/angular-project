import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCTS_FEATURE_KEY,
  ProductsState,
  productsAdapter,
} from './products.reducer';
import { IProduct } from '../products.models';

// Lookup the 'Products' feature state managed by NgRx
export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => selectAll(state)
);

// export const selectProductsEntities = createSelector(
//   selectProductsState,
//   (state: ProductsState) => selectEntities(state)
// );

export const selectSelectedId = createSelector(
  selectProductsState,
  (state: ProductsState) => (state.selectedId ? state.selectedId : 0)
);

export const selectQuery = createSelector(
  selectProductsState,
  (state: ProductsState) => state.query
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProduct
);

export const selectCategories = createSelector(
  selectProductsState,
  (state: ProductsState) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedCategory
);
