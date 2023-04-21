import { customElement } from 'lit/decorators.js';
import { Menu } from './lib/menu.js';

@customElement('rk-menu')
export class RkMenu extends Menu {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-menu': RkMenu;
  }
}
