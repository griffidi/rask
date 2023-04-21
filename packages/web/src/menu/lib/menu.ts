import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import css from './menu.css' assert { type: 'css' };

export class Menu extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) opened = false;
  @state() protected anchor: Ref<HTMLElement> = createRef();

  override connectedCallback(): void {
    super.connectedCallback();

    this.shadowRoot.querySelector('a')?.addEventListener('click', this.#closeMenu, { capture: true });

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
      <slot name="trigger" ${ref(this.anchor)} @click=${this.#openMenu}></slot>
      <aside>
        <slot></slot>
      </aside>
    `;
  }

  protected onWindowClick = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) {
      this.#closeMenu();
    }
  };

  close(): void {
    this.#closeMenu();
  }

  open(): void {
    this.#openMenu();
  }

  #closeMenu(): void {
    this.opened = false;
  }

  #openMenu(): void {
    this.opened = true;
  }
}
