import '@material/web/iconbutton/standard-icon-button.js';
import { isEmpty } from '@rask/core/validation/assert.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import type { NavItem } from '../../navigation-item/lib/types.js';
import '../../navigation-item/navigation-item.js';
import css from './navigation-drawer.css' assert { type: 'css' };

export class NavigationDrawer extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) disabled = false;
  // @property({ type: Array }) footerItems: ReadonlyArray<Readonly<NavItem>> | undefined;
  @property({ type: String }) headline: string | undefined;
  @property({ type: Array }) items: ReadonlyArray<Readonly<NavItem>> | undefined;
  @property({ type: Boolean, reflect: true }) opened = false;

  override connectedCallback(): void {
    super.connectedCallback();

    if (window?.addEventListener) {
      window.addEventListener('keydown', this.onKeydown, { capture: true });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (window?.removeEventListener) {
      window.removeEventListener('keydown', this.onKeydown);
    }
  }

  protected getDrawerClasses(): ClassInfo {
    return {
      visible: this.opened,
    };
  }

  protected getScrimClasses(): ClassInfo {
    return {
      visible: this.opened,
    };
  }

  override render(): TemplateResult {
    const ariaExpanded = this.opened ? 'true' : 'false';
    const ariaHidden = !this.opened ? 'true' : 'false';

    return html`
      <div
        class="scrim ${classMap(this.getScrimClasses())}"
        @click=${this.#closeDrawer}></div>
      <aside
        role="dialog"
        aria-expanded="${ariaExpanded}"
        aria-hidden="${ariaHidden}"
        class=${classMap(this.getDrawerClasses())}>
        ${this.renderNav()} ${this.renderFooter()}
      </aside>
    `;
  }

  protected renderNav(): TemplateResult {
    if (isEmpty(this.items)) {
      return html``;
    }

    return html`
      <nav>
        <h4>
          ${this.headline}
          <md-standard-icon-button
            tabindex="0"
            @click=${this.#closeDrawer}>
            menu_open
          </md-standard-icon-button>
        </h4>
        ${map(this.items, item => {
          return html`
            <rk-navigation-item
              .item=${item}
              @click=${this.#handleItemClicked}></rk-navigation-item>
          `;
        })}
      </nav>
    `;
  }

  protected renderFooter(): TemplateResult {
    return html`
      <footer></footer>
    `;
    //   if (isEmpty(this.footerItems)) {
    //     return html``;
    //   }

    //   return html`
    //     <footer>
    //       ${map(this.footerItems, (item) => {
    //         return html` <rk-navigation-item .item=${item}></rk-navigation-item> `;
    //       })};
    //     </footer>
    //   `;
  }

  show(): void {
    this.#openDrawer();
  }

  close(): void {
    this.#closeDrawer();
  }

  protected onKeydown = (e: KeyboardEvent) => {
    if (this.opened) {
      if (e.key.toLowerCase() === 'escape') {
        this.#closeDrawer();
      }
    }

    if (!this.opened) {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();

        this.#openDrawer();

        setTimeout(() => {
          const input = this.shadowRoot.querySelector('input');

          if (input) {
            input.focus();
          }
        });
      }
    }
  };

  #closeDrawer(): void {
    this.opened = false;
  }

  #openDrawer(): void {
    this.opened = true;
    this.focus();
  }

  #handleItemClicked(): void {
    this.#closeDrawer();
  }
}
