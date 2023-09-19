import { CartsFacade } from './../+state/carts.facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../carts.models';

@Component({
  selector: 'angular-project-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  public cartProducts$: Observable<ICart[]>;

  constructor(private cartFacade: CartsFacade) {
    this.cartProducts$ = this.cartFacade.cartProducts$;
  }
}
