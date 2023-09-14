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
  (state: ProductsState) => state.selectedId
);

export const selectSelectedProduct = createSelector(
  selectAllProducts,
  selectSelectedId,
  (products, selectedId) =>
    selectedId !== undefined ? products[selectedId] : undefined
);

export const selectFilteredProducts = createSelector(
  selectAllProducts, // get all products
  selectProductsState, // get the current state which contains the query
  (products: IProduct[], state: ProductsState) => {
    const query = state.query.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }
);
