import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-project-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageShellComponent {}
