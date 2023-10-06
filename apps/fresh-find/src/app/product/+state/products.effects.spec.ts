import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as ProductsActions from './products.actions';
import { ProductsEffects } from './products.effects';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductsFacade } from './products.facade';

const mockProductsFacade = {
  allProducts$: of([
    { id: 1, title: 'Test Product', thumbnail: 'path/to/img', price: 100 },
  ]),
  categories$: of(['Electronics', 'Clothing']),
  query$: of(''),
  selectedCategory$: of(null),
  doSearch: jest.fn(),
  selectProduct: jest.fn(),
  selectCategory: jest.fn(),
  loadProducts: jest.fn(),
  loadCategories: jest.fn(),
};

describe('ProductsEffects', () => {
  let actions: Observable<Action>;
  let effects: ProductsEffects;
  let productService: any;
  let router: any;

  beforeEach(() => {
    productService = {
      getProducts: jest.fn(),
      getCategories: jest.fn(),
      getProductDetail: jest.fn(),
    };
    router = {
      navigateByUrl: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: ProductService, useValue: productService },
        { provide: Router, useValue: router },
        { provide: ProductsFacade, useValue: mockProductsFacade },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
  });

  describe('loadProducts$', () => {
    it('should fetch products and dispatch success action', () => {
      const mockProducts = [
        {
          id: 2,
          title: 'iPhone X',
          description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
          price: 899,
          discountPercentage: 17.94,
          rating: 4.44,
          stock: 34,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          ],
        },
      ];
      productService.getProducts.mockReturnValue(of(mockProducts));

      actions = of(ProductsActions.loadProducts());
      const expected = new Observable((observer) => {
        observer.next(
          ProductsActions.loadProductsSuccess({ products: mockProducts })
        );
        observer.complete();
      });

      effects.loadProducts$.subscribe((action) => {
        expect(action).toEqual(
          ProductsActions.loadProductsSuccess({ products: mockProducts })
        );
      });
    });
  });

  describe('selectProductSuccess$', () => {
    it('should navigate to product detail page', () => {
      const mockProduct = {
        id: 2,
        title: 'iPhone X',
        description:
          'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        images: [
          'https://i.dummyjson.com/data/products/2/1.jpg',
          'https://i.dummyjson.com/data/products/2/2.jpg',
          'https://i.dummyjson.com/data/products/2/3.jpg',
          'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ],
      };

      actions = of(
        ProductsActions.selectProductSuccess({ selectedProduct: mockProduct })
      );

      effects.selectProductSuccess$.subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith(
          `products/${mockProduct.id}`
        );
      });
    });
  });
});
