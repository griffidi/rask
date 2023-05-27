import ':/components/settings-menu/settings-menu.js';
import { consume } from '@lit-labs/context';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/standard-icon-button.js';
// import '@material/web/linearprogress/linear-progress.js';
import { isAuthenticatedContext } from '@rask/identity/authentication/is-authenticated-context.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './header.css' assert { type: 'css' };

export class Header extends LitElement {
  static override styles = css;

  @consume({ context: isAuthenticatedContext, subscribe: true }) isAuthenticated: boolean;

  override render(): TemplateResult {
    const isAuthenticated = this.isAuthenticated;
    const leadingSide = isAuthenticated ? this.#renderLeadingSide() : html``;
    const trailingSide = isAuthenticated ? this.#renderTrailingSide() : html``;
    const { title } = this.shadowRoot.ownerDocument;

    console.debug(`isAuthenticated: ${isAuthenticated}`);

    return html`
      <header>
        <div class="leading-side">${leadingSide}</div>
        <div class="center">
          <a href="/">
            <div class="logo"></div>
            <h2>${title}</h2>
          </a>
        </div>
        <div class="trailing-side">${trailingSide}</div>
      </header>
      <!-- <md-linear-progress indeterminate></md-linear-progress> -->
    `;
  }

  #renderLeadingSide(): TemplateResult {
    return html`
      <md-standard-icon-button @click=${this.#handleMenuClick}>
        <md-icon>menu</md-icon>
      </md-standard-icon-button>
    `;
  }

  #renderTrailingSide(): TemplateResult {
    return html`
      <div class="search-instructions">
        <md-icon>search</md-icon>
      </div>
      <app-settings-menu></app-settings-menu>
    `;
  }

  #handleMenuClick(): void {
    this.dispatchEvent(
      new CustomEvent('menu-clicked', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

if (!customElements.get('app-header')) {
  customElements.define('app-header', Header);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': Header;
  }
}
