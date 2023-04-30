import ':/components/dashboard/dashboard.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './home-page.css' assert { type: 'css' };

export class HomePage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <app-dashboard>Top Saling Products</app-dashboard>
        <app-dashboard>Top Saling Products</app-dashboard>
        <app-dashboard>Top Saling Products</app-dashboard>
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
