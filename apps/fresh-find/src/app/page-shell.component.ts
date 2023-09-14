import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFacade } from './product/+state/products.facade';

@Component({
  selector: 'angular-project-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageShellComponent {
  //constructor(public productFacade: ProductsFacade) {}
}
