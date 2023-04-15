import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAuth, IToken } from '@packages/interfaces';

import { auth, authSuccess, logout } from './auth.actions';
import { isAuthenticated } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  authenticationState$ = this.store.select(isAuthenticated);

  constructor(private store: Store) {}

  auth(credentials: IAuth): void {
    this.store.dispatch(auth({ credentials }));
  }

  setToken(token: IToken): void {
    this.store.dispatch(authSuccess({ token }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
