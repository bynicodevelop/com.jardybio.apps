import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductEntity } from '@packages/interfaces';
import { messages } from '@packages/messages';

import { ProductService } from '../../services/product/product.service';
import { createNotification } from '../notification/notification.actions';
import {
  createProduct,
  createProductSuccess,
  deleteProduct,
  deleteProductSuccess,
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
          map((products: Object) =>
            loadProductsSuccess({
              products: products as ProductEntity[],
            })
          )
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

  createProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProductSuccess),
      map(() =>
        createNotification({
          messages: [messages['PRODUCT_CREATED_SUCCESSFULLY'].KEY],
        })
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) => {
        return this.productService.deleteProduct(action.product).pipe(
          map(() => {
            return deleteProductSuccess();
          })
        );
      })
    )
  );

  deleteProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductSuccess),
      switchMap(() => {
        return this.productService.loadProducts().pipe(
          map((products: Object) =>
            loadProductsSuccess({
              products: products as ProductEntity[],
            })
          )
        );
      })
    )
  );
}
