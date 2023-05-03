import { LitElement, html, type TemplateResult } from 'lit';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './documents-page.css' assert { type: 'css' };

export class DocumentsPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="container">${this.renderDocuments()}</div>
    `;
  }

  protected renderDocuments(): TemplateResult {
    return html`
      ${map(range(80), () => {
        return html`
          <div class="svg-container">
            <img
              src="file_code.svg"
              width="128px"
              height="128" />
          </div>
        `;
      })}
    `;
  }
}

if (!customElements.get('app-documents-page')) {
  customElements.define('app-documents-page', DocumentsPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-documents-page': DocumentsPage;
  }
}
