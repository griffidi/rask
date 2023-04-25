import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { createTableInternalRowSelectedEvent } from './events.js';
import css from './table-row.css' assert { type: 'css' };
import type { Table } from './table.js';

export const TABLE_ROW_SELECTOR = 'rk-table-row';

export class TableRow extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) header = false;
  @property({ reflect: true }) type = 'row';

  override connectedCallback(): void {
    super.connectedCallback();

    const table = this.closest<Table>('rk-table');

    if (table?.hasAttribute('selectable')) {
      this.addEventListener('click', this.#handleRowClick, { capture: true });
    }
  }

  override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  #handleRowClick(e: MouseEvent): void {
    e.stopPropagation();

    const table = this.closest<Table>('rk-table');

    if (table) {
      table.dispatchEvent(createTableInternalRowSelectedEvent(this));
    }
  }
}
