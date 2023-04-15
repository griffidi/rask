import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './table-row.css' assert { type: 'css' };

export const TABLE_ROW_SELECTOR = 'rk-table-row';

@customElement('rk-table-row')
export class TableRow extends LitElement {
  static override styles = [css];

  @property({ type: Boolean, reflect: true }) header = false;
  @property({ reflect: true }) override role = 'row';

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-row': TableRow;
  }
}
