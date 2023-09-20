import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PageShellComponent } from './page-shell.component';
import { HttpClientModule } from '@angular/common/http';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  PRODUCTS_FEATURE_KEY,
  productsReducer,
} from './product/+state/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CartModule } from './cart/cart.module';
import { CARTS_FEATURE_KEY } from './cart/+state/carts.reducer';

const reducers = { products: productsReducer };

//Wrap localStorageSync in an exported function
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [PRODUCTS_FEATURE_KEY, CARTS_FEATURE_KEY],
    storage: sessionStorage,
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent, PageShellComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(reducers, { metaReducers }), //Include in meta-reducers array
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([]),
    HttpClientModule,
    FontAwesomeModule,
    CartModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
