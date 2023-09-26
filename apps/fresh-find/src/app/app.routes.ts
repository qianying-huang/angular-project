import { Route } from '@angular/router';
import { PageShellComponent } from './page-shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PageShellComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
];
