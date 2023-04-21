import { customElement } from 'lit/decorators.js';
import { NavigationDrawer } from './lib/navigation-drawer.js';

@customElement('rk-navigation-drawer')
export class RkNavigationDrawer extends NavigationDrawer {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-navigation-drawer': RkNavigationDrawer;
  }
}
