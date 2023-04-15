import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct } from 'packages/interfaces/src/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  createProduct(product: IProduct): Observable<Object> {
    return this.http.post('/products', product);
  }
}
