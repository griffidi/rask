import { navItems } from './nav-items.js';
import css from './nav.css' assert { type: 'css' };
// import { footerNavItems } from './footer-nav-items.js';
import type { NavigationDrawer } from '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';

@customElement('app-nav')
export class Nav extends LitElement {
  static override styles = [css];

  #drawer: Ref<NavigationDrawer> = createRef();

  // @state() footerItems = footerNavItems;
  @state() items = navItems;

  override render(): TemplateResult {
    return html`
      <rask-navigation-drawer ${ref(this.#drawer)} headline="Site Navigation" .items=${this.items}>
      </rask-navigation-drawer>
    `;
  }

  show(): void {
    this.#drawer.value.show();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-nav': Nav;
  }
}
