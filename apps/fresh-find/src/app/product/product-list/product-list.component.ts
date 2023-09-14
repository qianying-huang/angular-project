import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../products.models';
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
    this.filteredProducts$ = this.productsFacade.filteredProducts$;
    // this.filteredProducts$ =
    //   this.productsFacade.allProducts$,
    //   this.productsFacade.query$
  }

  ngOnInit(): void {
    this.productsFacade.loadProducts();
  }

  doSearch(query: string): void {
    this.productsFacade.doSearch(query);
  }
}
