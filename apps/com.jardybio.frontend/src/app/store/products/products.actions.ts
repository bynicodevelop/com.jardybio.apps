import { IProduct } from 'packages/interfaces/src/product';

import { createAction, props } from '@ngrx/store';
import { ProductEntity } from '@packages/interfaces';

export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: IProduct }>()
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ product: ProductEntity }>()
);
