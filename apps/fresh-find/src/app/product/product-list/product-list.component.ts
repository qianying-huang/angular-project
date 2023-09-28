import { IProduct } from './../products.models';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, filter, map, take } from 'rxjs';
import { ProductsFacade } from '../+state/products.facade';
import { CartsFacade } from '../../cart/+state/carts.facade';
import { ICart } from '../../cart/carts.models';

@Component({
  selector: 'angular-project-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  public filteredProducts$: Observable<IProduct[]>;
  public categories$: Observable<string[]>;
  public cartCount$: Observable<number>;

  constructor(
    private productsFacade: ProductsFacade,
    private cartFacade: CartsFacade
  ) {
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
    this.cartCount$ = this.cartFacade.cartCount$;
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

  addToCart(product: IProduct): void {
    const cartProduct: ICart = {
      id: product.id,
      quantity: 1,
    };
    this.cartFacade.addProductToCart(cartProduct);
    //     this.cartFacade.clearCart();
  }
}
