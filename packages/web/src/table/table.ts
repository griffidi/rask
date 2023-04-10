import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';
import { TABLE_BODY_SELECTOR } from './table-body.js';
import { TABLE_CELL_SELECTOR } from './table-cell.js';
import { TABLE_HEADER_SELECTOR } from './table-header.js';
import { TABLE_ROW_SELECTOR, type TableRow } from './table-row.js';
import css from './table.css' assert { type: 'css' };

const TABLE_HEADER_CELLS_SELECTOR = `${TABLE_HEADER_SELECTOR} ${TABLE_CELL_SELECTOR}`;
const TABLE_ROWS_SELECTOR = `${TABLE_BODY_SELECTOR} ${TABLE_ROW_SELECTOR}`;

@customElement('rask-table')
export class Table extends LitElement {
  static override styles = [css];

  @queryAssignedElements({ selector: TABLE_HEADER_CELLS_SELECTOR, flatten: true })
  private readonly headerCells: Array<TableRow> | undefined;

  @queryAssignedElements({ selector: TABLE_ROWS_SELECTOR, flatten: true })
  private readonly rows: Array<TableRow> | undefined;

  override updated(): void {
    this.#assignSlots();
  }

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }

  #assignSlots(): void {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    this.headerCells?.forEach((cell) => {
      const th = document.createElement('th');
      const text = document.createTextNode(cell.textContent ?? '');

      th.appendChild(text);
    });

    table.appendChild(headerRow);

    this.shadowRoot?.appendChild(table);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rask-table': Table;
  }
}
