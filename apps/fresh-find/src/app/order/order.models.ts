import { ICart } from '../cart/carts.models';
import { IProductWithQuantity } from '../product/products.models';

export interface IOrder {
  id: string;
  productsInOrder: ICart[];
}

export interface IOrderWithDetails {
  id: string;
  productsInOrder: IProductWithQuantity[];
  amountBeforeTax: number;
  tax: number;
  totalAmount: number;
}
