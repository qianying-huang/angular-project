import { ICart } from '../cart/carts.models';

/**
 * Interface for the 'Orders' data
 */
export interface IOrder {
  id: string;
  productsInCart: ICart[];
  amountBeforeTax: number;
  tax: number;
  totalAmount: number;
}
