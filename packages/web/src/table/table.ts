import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './table.css' assert { type: 'css' };

@customElement('rask-table')
export class Table extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html` <table></table> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rask-table': Table;
  }
}
