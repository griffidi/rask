import { customElement } from 'lit/decorators.js';
import { ListItemLink } from './lib/list-item-link.js';

@customElement('rk-list-item-link')
export class RkListItemLink extends ListItemLink {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-list-item-link': RkListItemLink;
  }
}
