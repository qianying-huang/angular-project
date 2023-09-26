import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CARTS_FEATURE_KEY, CartState } from './carts.reducer';
import { selectAllProducts } from '../../product/+state/products.selectors';

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
  selectCartProducts,
  selectAllProducts,
  (cartProducts, allProducts) => {
    return cartProducts.reduce((total, cartProduct) => {
      const product = allProducts.find((p) => p.id === cartProduct.id);
      return total + (product ? product.price * cartProduct.quantity : 0);
    }, 0);
  }
);

export const selectTax = createSelector(
  selectAmountBeforeTax,
  (amountBeforeTax) => {
    return amountBeforeTax * 0.13;
  }
);
export const selectTotalAmount = createSelector(
  selectAmountBeforeTax,
  selectTax,
  (amountBeforeTax, tax) => {
    return amountBeforeTax + tax;
  }
);
