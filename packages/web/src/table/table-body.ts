import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table-body.css' assert { type: 'css' };

export const TABLE_BODY_SELECTOR = 'rk-table-body';

@customElement(TABLE_BODY_SELECTOR)
export class TableBody extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    TABLE_BODY_SELECTOR: TableBody;
  }
}
