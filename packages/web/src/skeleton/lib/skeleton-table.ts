import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import '../../table/table-cell.js';
import '../../table/table-header-cell.js';
import '../../table/table-row.js';
import '../../table/table.js';
import '../skeleton.js';

export class SkeletonTable extends LitElement {
  @property({ type: Number }) rows = 5;
  @property({ type: Number }) columns = 5;

  override render(): TemplateResult {
    return html` <rk-table>${this.#renderHeader()} ${this.#renderRows()}</rk-table> `;
  }

  #renderHeader(): TemplateResult {
    return html`
      <rk-table-row header>
        ${map(
          range(this.columns),
          () => html`
            <rk-table-header-cell>
              <rk-skeleton body medium width="100%"></rk-skeleton>
            </rk-table-header-cell>
          `
        )}
      </rk-table-row>
    `;
  }

  #renderRows(): TemplateResult {
    return html` ${map(range(this.rows), () => html` <rk-table-row> ${this.#renderTableCells()} </rk-table-row> `)} `;
  }

  #renderTableCells(): TemplateResult {
    return html`
      ${map(
        range(this.columns),
        () => html`
          <rk-table-cell>
            <rk-skeleton body large width="100%"></rk-skeleton>
          </rk-table-cell>
        `
      )}
    `;
  }
}
