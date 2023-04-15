import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductEntity } from '@packages/interfaces';

import { ProductService } from '../../services/product/product.service';
import { createProduct, createProductSuccess } from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

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
