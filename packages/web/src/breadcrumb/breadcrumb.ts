import { customElement } from 'lit/decorators.js';
import { Breadcrumb } from './lib/breadcrumb.js';

@customElement('rk-breadcrumb')
export class RkBreadcrumb extends Breadcrumb {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-breadcrumb': RkBreadcrumb;
  }
}
