import { CartsFacade } from './../+state/carts.facade';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, take, withLatestFrom } from 'rxjs';
import { ICart } from '../carts.models';
import { ProductsFacade } from '../../product/+state/products.facade';
import { IProduct, IProductWithQuantity } from '../../product/products.models';
import { UUID } from 'angular2-uuid';
import { OrdersFacade } from '../../order/+state/orders.facade';
import { IOrder } from '../../order/order.models';

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
    private productsFacade: ProductsFacade,
    private orderFacade: OrdersFacade
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

  public updateQuantity(productId: number, currentQuantity: number): void {
    this.cartFacade.updateProductQuantity(productId, currentQuantity);
  }
  public deleteProduct(productId: number): void {
    this.cartFacade.deleteProductFromCart(productId);
  }
  public onCheckout(): void {
    const orderConfirmationNumber = UUID.UUID();
    window.alert(
      `Your order is confirmed! Order Confirmation Number: ${orderConfirmationNumber}`
    );

    //take(1) auto-unsubscribe from the observable after taking the first value
    this.cartProducts$.pipe(take(1)).subscribe((cartProducts) => {
      const newOrder: IOrder = {
        id: orderConfirmationNumber,
        productsInOrder: cartProducts,
      };
      this.orderFacade.addOrder(newOrder);

      this.cartFacade.clearCart();
    });
  }
}
