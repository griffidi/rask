import { LitElement, html, type TemplateResult } from 'lit';
import css from './customers-page.css' assert { type: 'css' };

export class CustomersPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html``;
  }
}

if (!customElements.get('app-customers-page')) {
  customElements.define('app-customers-page', CustomersPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-customers-page': CustomersPage;
  }
}
