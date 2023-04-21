import { customElement } from 'lit/decorators.js';
import { TableRow } from './lib/table-row.js';

export const TABLE_ROW_SELECTOR = 'rk-table-row';

@customElement('rk-table-row')
export class RkTableRow extends TableRow {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-row': RkTableRow;
  }
}
