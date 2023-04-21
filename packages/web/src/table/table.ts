import { customElement } from 'lit/decorators.js';
import { Table } from './lib/table.js';

@customElement('rk-table')
export class RkTable extends Table {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table': RkTable;
  }
}
