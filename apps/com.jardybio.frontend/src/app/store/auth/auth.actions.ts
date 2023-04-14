import { createAction, props } from '@ngrx/store';
import { IAuth } from '@packages/interfaces';

export const auth = createAction(
  '[Auth] Auth',
  props<{ credentials: IAuth }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ token: string }>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ errors: string[] }>()
);
