import { CartsFacade } from './../+state/carts.facade';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { ICart } from '../carts.models';
import { ProductsFacade } from '../../product/+state/products.facade';
import { IProduct, IProductWithQuantity } from '../../product/products.models';

@Component({
  selector: 'angular-project-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  public cartProducts$: Observable<ICart[]>;
  public cartProductsDetails$: Observable<
    Array<IProductWithQuantity | undefined>
  >;
  public amountBeforeTax$: Observable<number>;
  public tax$: Observable<number>;
  public totalAmount$: Observable<number>;

  constructor(
    private cartFacade: CartsFacade,
    private productsFacade: ProductsFacade
  ) {
    this.cartProducts$ = this.cartFacade.cartProducts$;

    this.cartProductsDetails$ = this.cartProducts$.pipe(
      withLatestFrom(this.productsFacade.allProducts$),
      map(([cartProducts, allProducts]) => {
        const result = cartProducts.map((cartProduct) => {
          const productDetails: IProduct | undefined = allProducts.find(
            (product) => product.id === cartProduct.id
          );
          if (productDetails) {
            return {
              ...productDetails,
              quantity: cartProduct.quantity,
            } as IProductWithQuantity;
          } else {
            return undefined;
          }
        });

        return result;
      })
    );

    this.amountBeforeTax$ = this.cartFacade.amountBeforeTax$;
    this.tax$ = this.cartFacade.tax$;
    this.totalAmount$ = this.cartFacade.totalAmount$;
  }
}
