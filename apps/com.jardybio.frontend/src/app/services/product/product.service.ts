import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct, ProductEntity } from 'packages/interfaces/src/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  loadProducts(): Observable<Object> {
    return this.http.get('/products');
  }

  getProduct(id: number): Observable<Object> {
    return this.http.get(`/products/${id}`);
  }

  createProduct(product: IProduct): Observable<Object> {
    return this.http.post('/products', product);
  }

  deleteProduct(product: ProductEntity): Observable<Object> {
    return this.http.delete(`/products/${product.id}`);
  }
}
