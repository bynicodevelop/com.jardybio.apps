import { createReducer, on } from '@ngrx/store';
import { IAuth } from '@packages/interfaces';

import { auth, authFailure, authSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export type StateAuth = IAuth;

export const initialState: StateAuth = {
  login: '',
  password: '',
  token: undefined,
};

export const reducer = createReducer(
  initialState,
  on(
    auth,
    (state, { credentials }): IAuth => ({
      ...state,
      ...{
        login: credentials.login,
      },
    })
  ),
  on(authSuccess, (state, { token }): IAuth => {
    return {
      ...state,
      token,
    };
  }),
  on(authFailure, (state): IAuth => state)
);
