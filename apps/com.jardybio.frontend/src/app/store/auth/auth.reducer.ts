import { createReducer, on } from '@ngrx/store';
import { IAuth } from '@packages/interfaces';

import { auth, authFailure, authSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export type StateAuth = IAuth;

export const initialState: StateAuth = {
  login: '',
  password: '',
};

export const reducer = createReducer(
  initialState,
  on(auth, (state): IAuth => state),
  on(authSuccess, (state): IAuth => state),
  on(authFailure, (state): IAuth => state)
);
