import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import sharedCss from './table-cell-shared.css' assert { type: 'css' };
import css from './table-header-cell.css' assert { type: 'css' };

export class TableHeaderCell extends LitElement {
  static override styles = [
    sharedCss,
    css,
  ];

  @property({ type: Object }) align: 'center' | 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) add = false;
  @property() addIcon = 'add';
  @property({ type: Boolean, reflect: true }) edit = false;
  @property({ type: Number }) minWidth: number | undefined;
  @property({ type: Number }) width = 100;
  @property({ reflect: true }) type = 'columnheader';

  override render(): TemplateResult {
    return html`
      ${when(
        this.add,
        () => this.#renderAdd(),
        () => this.#renderSlot()
      )}
    `;
  }

  #renderSlot(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  #renderAdd(): TemplateResult {
    return html`
      <div>
        <md-icon>${this.addIcon}</md-icon>
      </div>
    `;
  }
}
