import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ORDERS_FEATURE_KEY,
  OrdersState,
  ordersAdapter,
} from './orders.reducer';

// Lookup the 'Orders' feature state managed by NgRx
export const selectOrdersState =
  createFeatureSelector<OrdersState>(ORDERS_FEATURE_KEY);

const { selectAll, selectEntities } = ordersAdapter.getSelectors();

export const selectOrdersLoaded = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.loaded
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => selectAll(state)
);

export const selectOrdersEntities = createSelector(
  selectOrdersState,
  (state: OrdersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectOrdersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
