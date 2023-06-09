import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductEntity } from '@packages/interfaces';

import {
  createProduct,
  createProductSuccess,
  getProduct,
  getProductSuccess,
  loadProducts,
  loadProductsSuccess,
} from './products.actions';

export const productsFeatureKey = 'products';

export type StateProduct = EntityState<ProductEntity>;

export const productAdapter = createEntityAdapter<ProductEntity>({
  selectId: (product: ProductEntity): number => product.id,
});

export const initialState: StateProduct = productAdapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(loadProducts, (state: StateProduct): StateProduct => state),
  on(getProduct, (state: StateProduct): StateProduct => state),
  on(getProductSuccess, (state: StateProduct, { product }): StateProduct => {
    return productAdapter.upsertOne(product, state);
  }),
  on(
    loadProductsSuccess,
    (state: StateProduct, { products }): StateProduct =>
      productAdapter.setAll(products, state)
  ),
  on(createProduct, (state: StateProduct): StateProduct => state),
  on(
    createProductSuccess,
    (state: StateProduct, { product }): StateProduct =>
      productAdapter.addOne(product, state)
  )
);
