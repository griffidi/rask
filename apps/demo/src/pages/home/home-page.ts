import ':/components/dashboard/product-sales-quantity/product-sales-quantity.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './home-page.css' assert { type: 'css' };

export class HomePage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <app-product-sales-quantity></app-product-sales-quantity>
      </div>
    `;
  }
}

if (!customElements.get('app-home-page')) {
  customElements.define('app-home-page', HomePage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
