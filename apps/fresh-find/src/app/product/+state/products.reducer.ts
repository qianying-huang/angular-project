import { IProduct } from './../products.models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, select } from '@ngrx/store';
import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<IProduct> {
  selectedId?: number; // which Products record has been selected
  loaded: boolean; // has the Products list been loaded
  error?: string | null; // last known error (if any)
  query: string;
  categories: string[];
  selectedCategory: string;
  selectedProduct?: IProduct;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const productsAdapter: EntityAdapter<IProduct> =
  createEntityAdapter<IProduct>();

export const initialProductsState: ProductsState =
  productsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    query: '',
    categories: [],
    selectedCategory: '',
  });

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    productsAdapter.setAll(products, { ...state, loaded: true })
  ),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
  })),
  on(ProductsActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductsActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(ProductsActions.selectProductSuccess, (state, { selectedProduct }) => ({
    ...state,
    selectedProduct: selectedProduct,
  })),
  on(ProductsActions.selectProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductsActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),
  on(ProductsActions.searchProduct, (state, { query }) => ({ ...state, query }))
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
