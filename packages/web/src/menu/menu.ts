import '@material/web/iconbutton/standard-icon-button.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import css from './menu.css' assert { type: 'css' };

@customElement('rk-menu')
export class Menu extends LitElement {
  static override styles = [css];

  @property() icon = 'more_horiz';
  @property({ type: Boolean, reflect: true }) opened = false;
  @state() protected anchor: Ref<HTMLElement> = createRef();

  override connectedCallback(): void {
    super.connectedCallback();

    this.shadowRoot.querySelector('a')?.addEventListener('click', this.#hideMenu, { capture: true });

    if (window?.addEventListener) {
      window.addEventListener('click', this.onWindowClick, { capture: true });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (window?.removeEventListener) {
      window.removeEventListener('click', this.onWindowClick, { capture: true });
    }
  }

  override render(): TemplateResult {
    return html`
      <md-standard-icon-button ${ref(this.anchor)} @click=${this.#showMenu}>${this.icon}</md-standard-icon-button>
      <aside>
        <slot></slot>
      </aside>
    `;
  }

  protected onWindowClick = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) {
      this.#hideMenu();
    }
  };

  #hideMenu(): void {
    this.opened = false;
  }

  #showMenu(): void {
    this.opened = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-menu': Menu;
  }
}
