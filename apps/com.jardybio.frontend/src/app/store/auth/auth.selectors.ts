import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, StateAuth } from './auth.reducer';

export const selectLoaderState =
  createFeatureSelector<StateAuth>(authFeatureKey);

export const isAuthenticated = createSelector(
  selectLoaderState,
  (state: StateAuth): boolean =>
    !!state.token?.token && new Date() < new Date(state.token.expires_at)
);
