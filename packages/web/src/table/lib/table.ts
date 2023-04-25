import { LitElement, html, type TemplateResult } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { createTableRowSelectedEvent, type TableInternalRowSelectedEvent } from './events.js';
import type { TableRow } from './table-row.js';
import css from './table.css' assert { type: 'css' };

export class Table extends LitElement {
  static override styles = css;

  @property({ reflect: true }) type = 'table';
  @property({ type: Boolean }) selectable = false;

  @queryAssignedElements({ selector: 'rk-table-row:not([header])', flatten: true }) rows: TableRow[];

  override connectedCallback(): void {
    super.connectedCallback();

    if (this.selectable) {
      this.addEventListener('internal-row-selected', this.#handleInternalRowSelected);
      this.addEventListener('internal-row-edit', this.#handleInternalRowEdit);
    }
  }

  override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  async #handleInternalRowSelected(e: Event): Promise<void> {
    e.stopPropagation();

    const { row } = (e as TableInternalRowSelectedEvent)['detail'];

    const prevRowSelected = this.rows.find(r => r.getAttribute('aria-selected') === 'true');

    if (prevRowSelected) {
      prevRowSelected.removeAttribute('selected');
      prevRowSelected.setAttribute('aria-selected', 'false');
    }

    row.setAttribute('selected', '');
    row.setAttribute('aria-selected', 'true');

    await this.updateComplete;

    this.dispatchEvent(createTableRowSelectedEvent(row));
  }

  async #handleInternalRowEdit(e: Event): Promise<void> {
    e.stopPropagation();

    const { row } = (e as TableInternalRowSelectedEvent)['detail'];

    const prevRowSelected = this.rows.find(r => r.getAttribute('aria-selected') === 'true');

    if (prevRowSelected) {
      prevRowSelected.removeAttribute('selected');
      prevRowSelected.setAttribute('aria-selected', 'false');
    }

    row.setAttribute('selected', '');
    row.setAttribute('aria-selected', 'true');

    await this.updateComplete;

    this.dispatchEvent(createTableRowSelectedEvent(row));
  }
}
