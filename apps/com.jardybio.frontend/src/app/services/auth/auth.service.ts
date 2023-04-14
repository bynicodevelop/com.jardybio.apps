import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IAuth, IToken } from '@packages/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const token = this.getToken();

    return !!token.token && new Date() < new Date(token.expires_at);
  }

  getToken(): IToken {
    return JSON.parse(localStorage.getItem('access_token') || '{}') as IToken;
  }

  auth(credentials: IAuth): Observable<Object> {
    return this.httpClient.post('/login', credentials);
  }
}
