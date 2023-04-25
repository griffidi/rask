import '@material/web/icon/icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { createTableInternalRowSelectedEvent } from './events.js';
import sharedCss from './table-cell-shared.css' assert { type: 'css' };
import css from './table-cell.css' assert { type: 'css' };

export class TableCell extends LitElement {
  static override styles = [
    sharedCss,
    css,
  ];

  @property({ type: Boolean, reflect: true }) edit = false;
  @property() editIcon = 'edit';

  @property({ reflect: true }) type = 'cell';

  override render(): TemplateResult {
    return html`
      ${when(
        this.edit,
        () => this.#renderEdit(),
        () => this.#renderSlot()
      )}
    `;
  }

  #renderSlot(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  #renderEdit(): TemplateResult {
    return html`
      <div @click=${this.#handleEditClick}>
        <md-icon>${this.editIcon}</md-icon>
      </div>
    `;
  }

  #handleEditClick(e: MouseEvent): void {
    e.stopPropagation();

    const row = this.closest('rk-table-row');

    if (row) {
      this.dispatchEvent(createTableInternalRowSelectedEvent(row));
    }
  }
}
