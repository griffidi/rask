import { LitElement, html, type TemplateResult } from 'lit';
import css from './breadcrumb.css' assert { type: 'css' };

export class Breadcrumb extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}
