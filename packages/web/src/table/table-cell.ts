import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table-cell.css' assert { type: 'css' };

@customElement('rask-table-cell')
export class TableCell extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rask-table-cell': TableCell;
  }
}
