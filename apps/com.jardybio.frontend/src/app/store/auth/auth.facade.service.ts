import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAuth } from '@packages/interfaces';

import { auth } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store) {}

  auth(credentials: IAuth): void {
    this.store.dispatch(auth({ credentials }));
  }
}
