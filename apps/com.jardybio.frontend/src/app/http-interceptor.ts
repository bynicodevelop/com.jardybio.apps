import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class DomainInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const domain = environment.api_host;

    request = request.clone({
      url: `${domain}${request.url}`,
    });

    return next.handle(request);
  }
}
