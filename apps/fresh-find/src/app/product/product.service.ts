import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './products.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.dbUrl}/products`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.dbUrl}/categories`);
  }

  // searchProducts(): void {
  //   console.log('search product works');
  // }
}
