import { LitElement, html, type TemplateResult } from 'lit';
import css from './page-not-found.css' assert { type: 'css' };

export class PageNotFound extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <div class="status-code">404</div>
        <div class="status">
          The page you are looking for doesn't exist or has been moved. Please go back to the homepage.
        </div>
        <a href="/">Go to homepage</a>
      </div>
    `;
  }
}

if (!customElements.get('app-page-not-found')) {
  customElements.define('app-page-not-found', PageNotFound);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-page-not-found': PageNotFound;
  }
}
