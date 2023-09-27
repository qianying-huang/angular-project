import { createReducer, on } from '@ngrx/store';

import * as CartsActions from './carts.actions';
import { ICart } from '../carts.models';
import { IProduct } from '../../product/products.models';

export const CARTS_FEATURE_KEY = 'carts';

export interface CartState {
  productsInCart: ICart[];
  loaded: boolean;
  error?: string | null;
}

export const initialCartState: CartState = {
  productsInCart: [],
  loaded: false,
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
      };
    }

    return state;
  }),

  on(CartsActions.deleteProductFromCart, (state, { productId }) => {
    const updatedProducts = state.productsInCart.filter(
      (product) => product.id !== productId
    );
    return {
      ...state,
      productsInCart: updatedProducts,
    };
  }),
  on(CartsActions.clearCart, (state) => {
    return {
      ...state,
      productsInCart: [],
    };
  })
);
