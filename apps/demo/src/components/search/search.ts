import navItems from ':/components/nav/nav-items.js';
import '@rask/web/command-palette/command-palette.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './search.css' assert { type: 'css' };

export class Search extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <rk-command-palette .jumpTos=${navItems}></rk-command-palette>
    `;
  }
}

if (!customElements.get('app-search')) {
  customElements.define('app-search', Search);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-search': Search;
  }
}
