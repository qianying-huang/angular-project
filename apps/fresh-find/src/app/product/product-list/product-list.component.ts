import { select } from '@ngrx/store';
import { IProduct } from './../products.models';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, filter, map, take } from 'rxjs';

import { ProductsFacade } from '../+state/products.facade';

@Component({
  selector: 'angular-project-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  public filteredProducts$: Observable<IProduct[]>;

  constructor(private productsFacade: ProductsFacade) {
    this.filteredProducts$ = combineLatest([
      this.productsFacade.allProducts$,
      this.productsFacade.query$,
    ]).pipe(
      map(([products, query]) => {
        if (!query) {
          return products;
        }
        return products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

  ngOnInit(): void {
    this.productsFacade.loadProducts();
  }

  doSearch(query: string): void {
    this.productsFacade.doSearch(query);
  }

  selectProduct(id: number): void {
    this.productsFacade.selectProduct(id);
  }
}
