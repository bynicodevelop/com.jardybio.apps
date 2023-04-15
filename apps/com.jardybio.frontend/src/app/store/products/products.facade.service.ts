import { Injectable } from '@angular/core';

import { IProduct } from 'packages/interfaces/src/product';

import { Store } from '@ngrx/store';

import { createProduct } from './products.actions';
import { selectAllProducts } from './products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  products$ = this.store.select(selectAllProducts);

  constructor(private store: Store) {}

  createProduct(product: IProduct): void {
    this.store.dispatch(createProduct({ product }));
  }
}
