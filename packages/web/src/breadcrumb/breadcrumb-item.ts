import { customElement } from 'lit/decorators.js';
import { BreadcrumbItem } from './lib/breadcrumb-item.js';

@customElement('rk-breadcrumb-item')
export class RkBreadcrumbItem extends BreadcrumbItem {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-breadcrumb-item': RkBreadcrumbItem;
  }
}
