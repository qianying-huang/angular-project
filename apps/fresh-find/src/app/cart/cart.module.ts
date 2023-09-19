import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCarts from './+state/carts.reducer';
import { CartsEffects } from './+state/carts.effects';
import { CartsFacade } from './+state/carts.facade';

@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCarts.CARTS_FEATURE_KEY, fromCarts.cartsReducer),
    EffectsModule.forFeature([CartsEffects]),
  ],
  providers: [CartsFacade],
})
export class CartModule {}
