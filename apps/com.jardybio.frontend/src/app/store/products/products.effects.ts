import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductEntity } from '@packages/interfaces';

import { ProductService } from '../../services/product/product.service';
import {
  createProduct,
  createProductSuccess,
  loadProducts,
  loadProductsSuccess,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this.productService.loadProducts().pipe(
          map((products: Object) => {
            console.log(products);
            return loadProductsSuccess({
              products: products as ProductEntity[],
            });
          })
        );
      })
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map((createdProduct: Object) => {
            return createProductSuccess({
              product: createdProduct as ProductEntity,
            });
          })
        );
      })
    )
  );
}
