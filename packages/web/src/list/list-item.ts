import { customElement } from 'lit/decorators.js';
import { ListItemEl } from './lib/list-item.js';

@customElement('rk-list-item')
export class RkListItem extends ListItemEl {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-list-item': RkListItem;
  }
}
