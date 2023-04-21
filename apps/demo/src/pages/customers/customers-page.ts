import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './customers-page.css' assert { type: 'css' };

@customElement('app-customers-page')
export class CustomersPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-customers-page': CustomersPage;
  }
}
