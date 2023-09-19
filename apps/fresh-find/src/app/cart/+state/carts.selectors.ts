import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CARTS_FEATURE_KEY, CartsState, cartsAdapter } from './carts.reducer';

// Lookup the 'Carts' feature state managed by NgRx
export const selectCartsState =
  createFeatureSelector<CartsState>(CARTS_FEATURE_KEY);

const { selectAll, selectEntities } = cartsAdapter.getSelectors();

export const selectCartsLoaded = createSelector(
  selectCartsState,
  (state: CartsState) => state.loaded
);

export const selectCartsError = createSelector(
  selectCartsState,
  (state: CartsState) => state.error
);

export const selectAllCartProducts = createSelector(
  selectCartsState,
  (state: CartsState) => selectAll(state)
);

export const selectCartsEntities = createSelector(
  selectCartsState,
  (state: CartsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCartsState,
  (state: CartsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCartsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectCartCount = createSelector(
  selectCartsState,
  (state: CartsState) => state.cartCount
);
