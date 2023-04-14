import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IToken } from '@packages/interfaces';

import { AuthService } from '../../services/auth/auth.service';
import { NotificationFacade } from '../notification/notification.facade.service';
import { auth, authFailure, authSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationFacade: NotificationFacade
  ) {}

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(auth),
      mergeMap((action) =>
        this.authService.auth(action.credentials).pipe(
          map((response: Object) => authSuccess({ token: response as IToken })),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(authFailure({ errors: errorResponse.error.errors }));
          })
        )
      )
    )
  );

  authSuccess$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(authSuccess),
        tap((action): void => {
          localStorage.setItem('access_token', JSON.stringify(action.token));
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(authFailure),
        tap((action): void => {
          this.notificationFacade.createNotification(action.errors);
        })
      ),
    { dispatch: false }
  );
}
