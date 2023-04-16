import { IProduct } from 'packages/interfaces/src/product';

import { createAction, props } from '@ngrx/store';
import { ProductEntity } from '@packages/interfaces';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: ProductEntity[] }>()
);

export const getProduct = createAction(
  '[Products] Get Product',
  props<{ id: number }>()
);

export const getProductSuccess = createAction(
  '[Products] Get Product Success',
  props<{ product: ProductEntity }>()
);

export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: IProduct }>()
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ product: ProductEntity }>()
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ product: ProductEntity }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success'
);
