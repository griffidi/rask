import { customElement } from 'lit/decorators.js';
import { List } from './lib/list.js';

@customElement('rk-list')
export class RkList extends List {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-list': RkList;
  }
}
