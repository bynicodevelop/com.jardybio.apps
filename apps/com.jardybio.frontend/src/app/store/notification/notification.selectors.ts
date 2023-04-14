import { createFeatureSelector, createSelector } from '@ngrx/store';

import { INotification } from '../../models/notification';
import {
  notificationFeatureKey,
  StateNotification,
} from './notification.reducer';

export const selectLoaderState = createFeatureSelector<StateNotification>(
  notificationFeatureKey
);

export const getNotification = createSelector(
  selectLoaderState,
  (state: StateNotification): INotification => state
);
