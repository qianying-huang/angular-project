import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrders from './+state/orders.reducer';
import { OrdersEffects } from './+state/orders.effects';
import { OrdersFacade } from './+state/orders.facade';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    StoreModule.forFeature(
      fromOrders.ORDERS_FEATURE_KEY,
      fromOrders.ordersReducer
    ),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  exports: [OrderComponent],
  providers: [OrdersFacade],
})
export class OrderModule {}
