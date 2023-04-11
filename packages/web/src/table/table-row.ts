import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table-row.css' assert { type: 'css' };

export const TABLE_ROW_SELECTOR = 'rk-table-row';

@customElement(TABLE_ROW_SELECTOR)
export class TableRow extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    TABLE_ROW_SELECTOR: TableRow;
  }
}
