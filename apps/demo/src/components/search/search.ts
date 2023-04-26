import { navItems } from ':/components/nav/nav-items.js';
import '@rask/web/command-palette/command-palette.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './search.css' assert { type: 'css' };

@customElement('app-search')
export class Search extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <rk-command-palette .jumpTos=${navItems}></rk-command-palette>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-search': Search;
  }
}
