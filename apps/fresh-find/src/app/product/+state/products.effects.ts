import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, map } from 'rxjs';
import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import { ProductService } from '../product.service';
import { ProductsFacade } from './products.facade';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productsFacade: ProductsFacade
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          map((categories) =>
            ProductsActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(ProductsActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  selectProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.selectProduct),
      switchMap((action) =>
        this.productService.getProductDetail(action.id).pipe(
          map((selectedProduct) =>
            ProductsActions.selectProductSuccess({ selectedProduct })
          ),
          catchError((error) =>
            of(ProductsActions.selectProductFailure({ error }))
          )
        )
      )
    )
  );
}
