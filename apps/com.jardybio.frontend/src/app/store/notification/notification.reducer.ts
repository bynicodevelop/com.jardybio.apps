import { createReducer, on } from '@ngrx/store';

import { NotificationEntity } from '../../models/notification';
import { createNotification, deleteNotification } from './notification.actions';

export const notificationFeatureKey = 'notification';

export type StateNotification = NotificationEntity;

export const initialState: StateNotification = {} as NotificationEntity;

export const reducer = createReducer(
  initialState,
  on(
    createNotification,
    (state, { messages }): StateNotification => ({
      ...state,
      messages,
    })
  ),
  on(
    deleteNotification,
    (state): StateNotification => ({
      ...state,
      messages: [],
    })
  )
);
