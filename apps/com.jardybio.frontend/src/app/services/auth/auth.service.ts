import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuth } from '@packages/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  auth(credentials: IAuth): Observable<Object> {
    return this.httpClient.post('/login', credentials);
  }
}
