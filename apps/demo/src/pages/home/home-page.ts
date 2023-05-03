import ':/components/dashboard/top-product-sales/top-product-sales.js';
import { ProductIds } from '@rask/api/enums/product-ids.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './home-page.css' assert { type: 'css' };

export class HomePage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <app-top-product-sales .productId=${ProductIds.tshirt}></app-top-product-sales>
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
