import { debounce } from '@rask/core/reactivity/timer/debounce.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { ClassInfo } from 'lit/directives/class-map.js';
import css from './search.css' assert { type: 'css' };

export class Search extends LitElement {
  static override styles = css;

  #previousValue: string | undefined;

  @property({ type: String }) defaultValue: string = '';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) opened: boolean = false;
  @property({ type: String }) value: string = '';
  @state() private focused: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.focus);
    this.addEventListener('focusin', this.#handleFocusin);
    this.addEventListener('focusin', this.#handleFocusout);

    // if (window?.addEventListener) {
    //   window.addEventListener('keydown', this.onKeydown, { capture: true });
    // }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    // if (window?.removeEventListener) {
    //   window.removeEventListener('keydown', this.onKeydown);
    // }
  }

  override render(): TemplateResult {
    return html`
      <div class="container__wrapper">
        <label class="container">
          ${this.renderLeadingIcon()} ${this.renderInput()} ${this.renderTrailingIcon()}
        </label>
      </div>
    `;
  }

  protected renderLeadingIcon(): TemplateResult {
    return html` <md-icon class="leading__icon">menu</md-icon> `;
  }

  protected renderTrailingIcon(): TemplateResult {
    return html` <md-icon class="trailing__icon">search</md-icon> `;
  }

  protected renderInput(): TemplateResult {
    return html`
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search site content"
        ?disabled="${this.disabled}"
        ?focused="${this.focused}"
        @input="${this.#handleInput}"
      />
    `;
  }

  protected getRenderClasses(): ClassInfo {
    return {
      disabled: this.disabled,
      focused: this.focused,
    };
  }

  override focus() {
    if (this.disabled || this.matches(':focus-within')) {
      // Don't shift focus from an element within the text field, like an icon
      // button, to the input when focus is requested.
      return;
    }

    super.focus();
  }

  protected onKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'k') {
      const input = this.shadowRoot.querySelector('input');

      if (input) {
        input.focus();
      }

      e.preventDefault();
    }
  };

  #handleFocusin(): void {
    this.focused = true;
  }

  #handleFocusout(): void {
    if (this.matches(':focus-within')) {
      // Changing focus to another child within the text field, like a button
      return;
    }

    this.focused = false;
  }

  #handleInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    debounce(() => {
      const { value } = input;

      if (this.#previousValue !== value) {
        this.focused = true;
        // this.dirty = true;
        this.value = value;
        this.#previousValue = value;
        // this.dispatchEvent(createraskSearchChangeEvent(value));
      }
    })();
  }
}
