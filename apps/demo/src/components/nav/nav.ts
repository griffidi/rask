import navItems from './nav-items.js';
import css from './nav.css' assert { type: 'css' };
// import { footerNavItems } from './footer-nav-items.js';
import type { NavigationDrawer } from '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

export class Nav extends LitElement {
  static override styles = css;

  #drawer: Ref<NavigationDrawer> = createRef();

  override render(): TemplateResult {
    return html`
      <rk-navigation-drawer
        ${ref(this.#drawer)}
        headline="Site Navigation"
        .items=${navItems}></rk-navigation-drawer>
    `;
  }

  show(): void {
    this.#drawer.value.show();
  }
}

if (!customElements.get('app-nav')) {
  customElements.define('app-nav', Nav);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-nav': Nav;
  }
}
