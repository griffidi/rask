import '@material/web/icon/icon.js';
import { debounce } from '@rask/core/reactivity/timer/debounce.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { map } from 'lit/directives/map.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import type { ListChangeEvent } from '../../list/lib/events.js';
import type { ListItem } from '../../list/lib/list-item.js';
import { List } from '../../list/lib/list.js';
import '../../list/list-item-link.js';
import '../../list/list.js';
import type { NavItem } from '../../navigation-item/lib/types.js';
import { NAVIGABLE_KEYS, isNavigableKey } from '../../navigation/navigable.js';
import css from './command-palette.css' assert { type: 'css' };
import { createCommandPaletteSearchEvent } from './events.js';

export class CommandPalette extends LitElement {
  static override styles = css;

  readonly #debounceHandleInput = debounce((e: Event) => this.#handleInput(e), 500);
  #inputRef: Ref<HTMLInputElement | undefined> = createRef();
  #jumpToListRef: Ref<List | undefined> = createRef();

  @property({ type: Boolean, reflect: true }) animating = false;
  @property({ type: Array }) jumpTos: NavItem[] | undefined;
  @property({ type: Boolean, reflect: true }) opened = false;
  @property() value = '';

  @query('.container') containerEl!: HTMLElement;
  @query('aside') searchEl: HTMLElement;

  @state() protected activeListItem: ListItem | undefined;

  override connectedCallback(): void {
    super.connectedCallback();

    if (window?.addEventListener) {
      window.addEventListener('keydown', this.#onKeydown, { capture: true });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (window?.removeEventListener) {
      window.removeEventListener('keydown', this.#onKeydown);
    }
  }

  override firstUpdated(): void {
    /**
     * Because div.container element is added dynamically to the DOM,
     * click event is registered here instead of using @click expression.
     */
    this.containerEl.addEventListener('click', this.#onContainerClick, { capture: true });
  }

  protected getModalClasses(): ClassInfo {
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
      ${when(this.jumpTos?.length, () => this.renderCustomProperties())}
      <div
        class="scrim ${classMap(this.getScrimClasses())}"
        role="button"
        aria-haspopup="listbox"
        aria-expanded="${ariaExpanded}"
        aria-hidden="${ariaHidden}"
        @transitionend=${() => (this.animating = false)}></div>
      <div class="container">${when(this.opened, () => cache(this.renderCommandPalette()))}</div>
    `;
  }

  /**
   * Dynamically render custom properties used in CSS calculations.
   */
  protected renderCustomProperties(): TemplateResult {
    return html`
      <style>
        :host {
          --_jump-to-item-count: ${this.jumpTos.length};
        }
      </style>
    `;
  }

  protected renderCommandPalette(): TemplateResult {
    return html`
      <aside class=${classMap(this.getModalClasses())}>
        ${this.renderSearchInput()} ${this.renderJumpTo()} ${this.renderFooter()}
      </aside>
    `;
  }

  protected renderSearchInput(): TemplateResult {
    return html`
      <header>
        <label>
          <md-icon>search</md-icon>
          ${when(this.activeListItem, () => this.renderActivePath())}
          <input
            ${ref(this.#inputRef)}
            placeholder="Search or jump to..."
            .value=${live(this.value)}
            @keydown=${this.#handleInputKeydown}
            @input=${this.#debounceHandleInput} />
        </label>
      </header>
    `;
  }

  protected renderActivePath(): TemplateResult {
    const { text } = this.activeListItem;
    return html`
      <span class="active-path">${text}</span>
      <span class="active-path-seperator">/</span>
    `;
  }

  protected renderSearchResults(): TemplateResult {
    return html`
      <section></section>
    `;
  }

  protected renderJumpTo(): TemplateResult {
    /**
     * TODO: Disable <md-list-item-link> ripple affect when
     * support is added to disable it.
     */
    return html`
      <section>
        <rk-list
          ${ref(this.#jumpToListRef)}
          class="jump-to"
          @change=${this.#handleListChange}>
          ${map(this.jumpTos, jumpTo => {
            return html`
              <rk-list-item-link
                .href=${jumpTo.path}
                .headline=${jumpTo.label}>
                <div slot="start">
                  <md-icon>${jumpTo.icon}</md-icon>
                </div>
                <div slot="end">Jump To</div>
              </rk-list-item-link>
            `;
          })}
        </rk-list>
      </section>
    `;
  }

  protected renderFooter(): TemplateResult {
    return html`
      <footer>
        <div class="instructions">
          <label>
            <md-icon>keyboard_return</md-icon>
            to select
          </label>
          <label>
            <md-icon>keyboard_arrow_down</md-icon>
            <md-icon>keyboard_arrow_up</md-icon>
            to navigate
          </label>
          <label>
            <span class="icon-like">esc</span>
            to close
          </label>
        </div>
        <div class="search-by">
          <span>Powered by</span>
          <img
            src="rask.svg"
            width="24px"
            height="24px" />
        </div>
      </footer>
    `;
  }

  readonly #onContainerClick = (e: MouseEvent) => {
    if (!e.composedPath().includes(this.searchEl)) {
      this.#hideModal();
    }
  };

  readonly #onKeydown = (e: KeyboardEvent) => {
    if (this.opened) {
      if (e.key.toLowerCase() === 'escape') {
        this.#hideModal();
      }
    }

    if (!this.opened) {
      if (e.ctrlKey && (e.key === 'k' || e.key === '/')) {
        e.preventDefault();

        this.#showModal();

        setTimeout(() => {
          const input = this.shadowRoot.querySelector('input');

          if (input) {
            input.focus();
          }
        });
      }
    }
  };

  readonly #handleInputKeydown = (e: KeyboardEvent) => {
    const { key } = e;

    if (!isNavigableKey(key)) {
      return;
    }

    const { items } = this.#jumpToListRef.value;
    const activeItemRecord = List.getActiveItem(items);

    if (activeItemRecord) {
      activeItemRecord.item.active = false;
    }

    const itemIndex = key === NAVIGABLE_KEYS.ArrowDown || key === NAVIGABLE_KEYS.Home ? 0 : -1;
    items.at(itemIndex).active = true;
  };

  #showModal(): void {
    this.opened = true;
    this.animating = true;
  }

  #hideModal(): void {
    this.opened = false;
  }

  #handleInput(e: Event): void {
    e.stopPropagation();

    const { value } = this.#inputRef.value;
    this.value = value;
    this.dispatchEvent(createCommandPaletteSearchEvent(value));
  }

  #handleListChange(e: ListChangeEvent): void {
    this.activeListItem = e.detail.item;
  }
}
