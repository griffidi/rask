import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table-header.css' assert { type: 'css' };

export const TABLE_HEADER_SELECTOR = 'rask-table-header';

@customElement(TABLE_HEADER_SELECTOR)
export class TableHeader extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    TABLE_HEADER_SELECTOR: TableHeader;
  }
}
