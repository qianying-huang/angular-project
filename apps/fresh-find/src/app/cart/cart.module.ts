import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCarts from './+state/carts.reducer';
import { CartsEffects } from './+state/carts.effects';
import { CartsFacade } from './+state/carts.facade';
import { ProductsFacade } from '../product/+state/products.facade';
import { OrderModule } from '../order/order.module';

@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCarts.CARTS_FEATURE_KEY, fromCarts.cartReducer),
    EffectsModule.forFeature([CartsEffects]),
    OrderModule,
  ],
  providers: [CartsFacade, ProductsFacade],
})
export class CartModule {}
