import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListComponent } from './cart-list.component';
import { of } from 'rxjs';
import { CartsFacade } from '../+state/carts.facade';
import { ProductsFacade } from '../../product/+state/products.facade';
import { OrdersFacade } from '../../order/+state/orders.facade';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  const mockCartFacade = {
    cartProducts$: of([]),
    amountBeforeTax$: of(0),
    tax$: of(0),
    totalAmount$: of(0),
    updateProductQuantity: jest.fn(),
    deleteProductFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  const mockProductsFacade = {
    allProducts$: of([]),
  };

  const mockOrderFacade = {
    addOrder: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartListComponent],
      providers: [
        { provide: CartsFacade, useValue: mockCartFacade },
        { provide: ProductsFacade, useValue: mockProductsFacade },
        { provide: OrdersFacade, useValue: mockOrderFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update product quantity', () => {
    component.updateQuantity(1, 5);
    expect(mockCartFacade.updateProductQuantity).toHaveBeenCalledWith(1, 5);
  });

  it('should delete a product from cart', () => {
    component.deleteProduct(1);
    expect(mockCartFacade.deleteProductFromCart).toHaveBeenCalledWith(1);
  });

  it('should checkout and clear the cart', () => {
    component.onCheckout();
    expect(mockOrderFacade.addOrder).toHaveBeenCalled();
    expect(mockCartFacade.clearCart).toHaveBeenCalled();
  });
});
