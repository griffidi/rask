import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './footer.css' assert { type: 'css' };

@customElement('app-footer')
export class Footer extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <div class="trailing-side">
        <a class="logo" href="https://tfs.ubcmain.com/tfs/Clients/Frameworks.git/_git/Huron" target="_blank">
          <img src="azure_devops.svg" alt="Azure DevOps" />
        </a>
        <span>© rask ${new Date().getFullYear()}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': Footer;
  }
}
