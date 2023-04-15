import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductEntity } from '@packages/interfaces';

import { createProduct, createProductSuccess } from './products.actions';

export const productsFeatureKey = 'products';

export type StateProduct = EntityState<ProductEntity>;

export const productAdapter = createEntityAdapter<ProductEntity>({
  selectId: (product: ProductEntity): string => product.uid,
});

export const initialState: StateProduct = productAdapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(createProduct, (state: StateProduct): StateProduct => state),
  on(
    createProductSuccess,
    (state: StateProduct, { product }): StateProduct =>
      productAdapter.addOne(product, state)
  )
);
