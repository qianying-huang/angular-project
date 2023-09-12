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
  public allProduct$: Observable<IProduct[]>;

  constructor(private productsFacade: ProductsFacade) {
    this.allProduct$ = this.productsFacade.allProducts$;
  }

  ngOnInit(): void {
    this.productsFacade.loadProducts();
  }
}
