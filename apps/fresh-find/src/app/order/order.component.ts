import { Component, OnInit } from '@angular/core';
import { OrdersFacade } from './+state/orders.facade';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { IOrder, IOrderWithDetails } from './order.models';
import { IProduct, IProductWithQuantity } from '../product/products.models';
import { ProductsFacade } from '../product/+state/products.facade';

@Component({
  selector: 'angular-project-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public allOrders$: Observable<IOrder[]>;
  public allProducts$: Observable<IProduct[]>;
  public allOrdersWithDetails$: Observable<IOrderWithDetails[]> | undefined;

  constructor(
    private orderFacade: OrdersFacade,
    private productsFacade: ProductsFacade
  ) {
    this.allOrders$ = this.orderFacade.allOrders$;
    this.allProducts$ = this.productsFacade.allProducts$;
  }

  ngOnInit(): void {
    this.orderFacade.loadOrders();

    //combine order details with product details
    this.allOrdersWithDetails$ = this.allOrders$.pipe(
      withLatestFrom(this.allProducts$),
      map(([allOrders, allProducts]) => {
        //for every order in allOrders, go through its products
        return allOrders.map((order) => {
          const productsInOrder = order.productsInOrder.map((orderProduct) => {
            //for each product, look up its complete details from allProducts using the product ID
            const productDetails = allProducts.find(
              (product) => product.id === orderProduct.id
            );
            // if the product details are found, combine them with the quantity from the cart
            if (productDetails) {
              return {
                ...productDetails,
                quantity: orderProduct.quantity,
              } as IProductWithQuantity;
            } else {
              return undefined;
            }
          });

          const amountBeforeTax = productsInOrder.reduce(
            (acc, product) =>
              acc + (product?.price || 0) * (product?.quantity || 0),
            0
          );

          const tax = amountBeforeTax * 0.13;
          const totalAmount = amountBeforeTax + tax;
          return {
            ...order,
            productsInOrder: productsInOrder,
            amountBeforeTax,
            tax,
            totalAmount,
          } as IOrderWithDetails;
        });
      })
    );
  }
}
