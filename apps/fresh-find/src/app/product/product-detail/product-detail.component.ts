import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, filter, map, take } from 'rxjs';
import { IProduct } from '../products.models';
import { ActivatedRoute } from '@angular/router';
import { ProductsFacade } from '../+state/products.facade';

@Component({
  selector: 'angular-project-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<IProduct | undefined>;

  constructor(private productsFacade: ProductsFacade) {}

  ngOnInit(): void {
    this.product$ = this.productsFacade.selectedProduct$;
  }
}
