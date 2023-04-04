import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './table-row.css' assert { type: 'css ' };

@customElement('rask-table-row')
export class TableRow extends LitElement {
  static override styles = [css];

  @property() header = '';

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rask-table-row': TableRow;
  }
}
