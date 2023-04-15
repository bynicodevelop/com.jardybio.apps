import { createAction, props } from '@ngrx/store';
import { IAuth, IToken } from '@packages/interfaces';

export const auth = createAction(
  '[Auth] Auth',
  props<{ credentials: IAuth }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ token: IToken }>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ errors: string[] }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');
