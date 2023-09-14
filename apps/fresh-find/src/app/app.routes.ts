import { Route } from '@angular/router';
import { PageShellComponent } from './page-shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PageShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
];
