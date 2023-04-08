import '#/components/settings-menu/settings-menu.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/standard-icon-button.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './header.css' assert { type: 'css' };

@customElement('app-header')
export class Header extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    const { title } = this.shadowRoot.ownerDocument;

    return html`
      <header>
        <div class="leading-side">
          <md-standard-icon-button @click=${this.#handleMenuClick}>menu</md-standard-icon-button>
          <a href="/">
            <div class="logo"></div>
            <h2>${title}</h2>
          </a>
        </div>
        <div class="trailing-side">
          <div class="search-instructions">
            <md-icon>search</md-icon>
          </div>
          <app-settings-menu></app-settings-menu>
        </div>
      </header>
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

declare global {
  interface HTMLElementTagNameMap {
    'app-header': Header;
  }
}