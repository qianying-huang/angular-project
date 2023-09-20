import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, map, tap } from 'rxjs';
import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import { ProductService } from '../product.service';
import { ProductsFacade } from './products.facade';
import { Route, Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productsFacade: ProductsFacade,
    private router: Router
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
      switchMap(({ id }) =>
        this.productService.getProductDetail(id).pipe(
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

  selectProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.selectProductSuccess),
        tap(({ selectedProduct }) => {
          this.router.navigateByUrl(`products/${selectedProduct.id}`);
        })
      ),
    { dispatch: false }
  );
}
