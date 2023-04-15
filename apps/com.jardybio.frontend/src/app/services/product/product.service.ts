import { Injectable } from '@angular/core';

import { IProduct } from 'packages/interfaces/src/product';
import { Observable, of } from 'rxjs';

import { ProductEntity } from '@packages/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  createProduct(product: IProduct): Observable<ProductEntity> {
    return of({ ...product, uid: '1234' });
  }
}
