import { createAction, props } from '@ngrx/store';

export const createNotification = createAction(
  '[Notification] Create Notification',
  props<{ messages: string[] }>()
);

export const deleteNotification = createAction(
  '[Notification] Delete Notification'
);
