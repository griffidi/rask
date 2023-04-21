import { customElement } from 'lit/decorators.js';
import { NavigationItem } from './lib/navigation-item.js';

@customElement('rk-navigation-item')
export class RkNavigationItem extends NavigationItem {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-navigation-item': RkNavigationItem;
  }
}
