import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table-cell.css' assert { type: 'css' };

export const TABLE_CELL_SELECTOR = 'rk-table-cell';

@customElement(TABLE_CELL_SELECTOR)
export class TableCell extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    TABLE_CELL_SELECTOR: TableCell;
  }
}
