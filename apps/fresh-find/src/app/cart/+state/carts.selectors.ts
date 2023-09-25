import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CARTS_FEATURE_KEY, CartState } from './carts.reducer';

export const selectCartState =
  createFeatureSelector<CartState>(CARTS_FEATURE_KEY);

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.productsInCart
);

export const selectCartLoaded = createSelector(
  selectCartState,
  (state: CartState) => state.loaded
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectAmountBeforeTax = createSelector(
  selectCartState,
  (state: CartState) => state.amountBeforeTax
);

export const selectTax = createSelector(
  selectCartState,
  (state: CartState) => state.tax
);

export const selectTotalAmount = createSelector(
  selectCartState,
  (state: CartState) => state.totalAmount
);
