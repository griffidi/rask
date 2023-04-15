import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './table.css' assert { type: 'css' };

@customElement('rk-table')
export class Table extends LitElement {
  static override styles = [css];

  @property({ reflect: true }) override role = 'table';

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-table': Table;
  }
}
