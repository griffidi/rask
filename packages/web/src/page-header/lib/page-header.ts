import { LitElement, html, type TemplateResult } from 'lit';
import css from './page-header.css' assert { type: 'css' };

export class PageHeader extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <header>
        <slot name="headline"></slot>
        <slot></slot>
      </header>
    `;
  }
}
