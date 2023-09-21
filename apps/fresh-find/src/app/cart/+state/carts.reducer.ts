import { createReducer, on, Action } from '@ngrx/store';

import * as CartsActions from './carts.actions';
import { ICart } from '../carts.models';

export const CARTS_FEATURE_KEY = 'carts';

export interface CartState {
  productsInCart: ICart[];
  amountBeforeTax: number;
  loaded: boolean;
  error?: string | null;
  // cartCount: number;
}

export const initialCartState: CartState = {
  productsInCart: [],
  amountBeforeTax: 0,
  loaded: false,
  // cartCount: 0,
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartsActions.loadCart, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CartsActions.loadCartSuccess, (state, { carts }) => ({
    ...state,
    productsInCart: carts,
    // cartCount: calculateCartCount(carts),
    loaded: true,
  })),
  on(CartsActions.loadCartFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CartsActions.addProductToCartSuccess, (state, { product }) => {
    const newProductsInCart = [...state.productsInCart, product];
    return {
      ...state,
      productsInCart: newProductsInCart,
      //  cartCount: calculateCartCount(newProductsInCart),
    };
  }),
  on(CartsActions.updateProductQuantity, (state, { product }) => {
    const existingIndex = state.productsInCart.findIndex(
      (p) => p.id === product.id
    );

    if (existingIndex > -1) {
      // create a new product object with the updated quantity
      const updatedProduct: ICart = {
        ...state.productsInCart[existingIndex],
        quantity: product.quantity,
      };

      // create a new array of products with the updated product
      const updatedProducts = [
        ...state.productsInCart.slice(0, existingIndex),
        updatedProduct,
        ...state.productsInCart.slice(existingIndex + 1),
      ];

      return {
        ...state,
        productsInCart: updatedProducts,
        // cartCount: calculateCartCount(updatedProducts),
      };
    }

    return state;
  })
);
