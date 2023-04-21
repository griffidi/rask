import { customElement } from 'lit/decorators.js';
import { Search } from './lib/search.js';

@customElement('rk-search')
export class RkSearch extends Search {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-search': RkSearch;
  }
}
