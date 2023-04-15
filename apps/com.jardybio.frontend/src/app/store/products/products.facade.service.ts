import { Injectable } from '@angular/core';

import { IProduct, ProductEntity } from 'packages/interfaces/src/product';

import { Store } from '@ngrx/store';

import { createProduct, deleteProduct, loadProducts } from './products.actions';
import { selectAllProducts } from './products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  products$ = this.store.select(selectAllProducts);

  constructor(private store: Store) {}

  loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  createProduct(product: IProduct): void {
    this.store.dispatch(createProduct({ product }));
  }

  deleteProduct(product: ProductEntity): void {
    this.store.dispatch(deleteProduct({ product }));
  }
}
