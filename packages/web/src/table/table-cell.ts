import { customElement } from 'lit/decorators.js';
import { TableCell } from './lib/table-cell.js';

@customElement('rk-table-cell')
export class RkTableCell extends TableCell {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-cell': RkTableCell;
  }
}
