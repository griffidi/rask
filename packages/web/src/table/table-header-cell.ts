import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import sharedCss from './table-cell-shared.css' assert { type: 'css' };
import css from './table-header-cell.css' assert { type: 'css' };

@customElement('rk-table-header-cell')
export class TableHeaderCell extends LitElement {
  static override styles = [sharedCss, css];

  @property({ type: Object }) align: 'center' | 'left' | 'right' = 'left';
  @property({ type: Number }) minWidth: number | undefined;
  @property({ type: Number }) width = 100;
  @property({ reflect: true }) override role = 'columnheader';

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table-header-cell': TableHeaderCell;
  }
}
