import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductEntity } from '@packages/interfaces';

import {
  productAdapter,
  productsFeatureKey,
  StateProduct,
} from './products.reducer';

const { selectAll } = productAdapter.getSelectors();

export const selectProductState =
  createFeatureSelector<StateProduct>(productsFeatureKey);

export const selectAllProducts = createSelector(
  selectProductState,
  (state: StateProduct): ProductEntity[] => selectAll(state)
);

export const selectProductById = (id: number) =>
  createSelector(
    selectProductState,
    (state: StateProduct): ProductEntity | undefined =>
      selectAll(state).find((p) => p.id === id)
  );
