import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import sharedCss from './table-cell-shared.css' assert { type: 'css' };
import css from './table-cell.css' assert { type: 'css' };

@customElement('rk-table-cell')
export class TableCell extends LitElement {
  static override styles = [sharedCss, css];

  @property({ reflect: true }) override role = 'cell';

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-cell': TableCell;
  }
}
