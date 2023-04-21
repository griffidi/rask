import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './documents-page.css' assert { type: 'css' };

@customElement('app-documents-page')
export class DocumentsPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html` <div class="container">${this.renderDocuments()}</div> `;
  }

  protected renderDocuments(): TemplateResult {
    return html`
      ${map(range(80), () => {
        return html`
          <div class="svg-container">
            <img src="file_code.svg" width="128px" height="128" />
          </div>
        `;
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-documents-page': DocumentsPage;
  }
}
