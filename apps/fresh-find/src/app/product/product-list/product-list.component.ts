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
  public categories$: Observable<string[]>;

  constructor(private productsFacade: ProductsFacade) {
    this.filteredProducts$ = combineLatest([
      this.productsFacade.allProducts$,
      this.productsFacade.query$,
      this.productsFacade.selectedCategory$,
    ]).pipe(
      map(([products, query, selectedCategory]) => {
        return products.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) &&
            (!selectedCategory || product.category === selectedCategory)
        );
      })
    );

    this.categories$ = this.productsFacade.categories$;
  }

  ngOnInit(): void {
    this.productsFacade.loadProducts();
    this.productsFacade.loadCategories();
  }

  doSearch(query: string): void {
    this.productsFacade.doSearch(query);
  }

  selectProduct(id: number): void {
    this.productsFacade.selectProduct(id);
  }

  selectCategory(category: string): void {
    this.productsFacade.selectCategory(category);
  }
}
