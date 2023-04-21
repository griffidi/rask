import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './page-not-found.css' assert { type: 'css' };

@customElement('app-page-not-found')
export class PageNotFound extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <div class="status-code">404</div>
        <div class="status">Page not found</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-page-not-found': PageNotFound;
  }
}
