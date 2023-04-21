import { customElement } from 'lit/decorators.js';
import { TableHeaderCell } from './lib/table-header-cell.js';

@customElement('rk-table-header-cell')
export class RkTableHeaderCell extends TableHeaderCell {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-header-cell': RkTableHeaderCell;
  }
}
