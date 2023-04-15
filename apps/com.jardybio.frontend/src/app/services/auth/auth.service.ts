import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IAuth, IToken } from '@packages/interfaces';

import { AuthFacade } from '../../store/auth/auth.facade.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private authFacade: AuthFacade) {}

  isAuthenticated(): boolean {
    const token = this.getToken();

    const isAuthenticated =
      !!token.token && new Date() < new Date(token.expires_at);

    if (isAuthenticated) {
      this.authFacade.setToken(token);
    }

    return isAuthenticated;
  }

  getToken(): IToken {
    return JSON.parse(localStorage.getItem('access_token') || '{}') as IToken;
  }

  auth(credentials: IAuth): Observable<Object> {
    return this.httpClient.post('/login', credentials);
  }
}
