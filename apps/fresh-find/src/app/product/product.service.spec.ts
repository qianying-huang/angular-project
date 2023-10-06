import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IProduct } from './products.models';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //mock the actual HTTP requests
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', (done) => {
    const dummyProducts: IProduct[] = [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        rating: 4.69,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        images: [
          'https://i.dummyjson.com/data/products/1/1.jpg',
          'https://i.dummyjson.com/data/products/1/2.jpg',
          'https://i.dummyjson.com/data/products/1/3.jpg',
          'https://i.dummyjson.com/data/products/1/4.jpg',
          'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
      },
      {
        id: 2,
        title: 'iPhone X',
        description:
          'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        price: 899,
        rating: 4.44,
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

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
      done();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/products`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts); // send dummyProducts as a response to the HTTP request
  });

  it('should fetch product detail', () => {
    const dummyProduct: IProduct = {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      rating: 4.69,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ],
    };

    service.getProductDetail(1).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/products/1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should fetch categories', (done) => {
    const dummyCategories: string[] = ['category1', 'category2'];

    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
      done();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/categories`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });
});
