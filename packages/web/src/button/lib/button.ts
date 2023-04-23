import '@material/web/icon/icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { dispatchActivationClick, isActivationClick } from '../../controllers/events.js';
import css from './button.css' assert { type: 'css' };

export class Button extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) elevated = false;
  @property({ type: Boolean, reflect: true }) outlined = false;
  @property() label = '';
  @property({ type: Boolean }) preventClickDefault = false;
  @query('.rk-button') protected buttonElement!: HTMLElement;
  @property({ type: String, reflect: true }) type: 'submit' | undefined;

  @state() protected showFocusRing = false;

  constructor() {
    super();
    this.addEventListener('click', this.#handleActivationClick);
  }

  override render(): TemplateResult {
    return html`
      <button
        role="button"
        tabindex="0"
        class="rk-button ${classMap(this.getRenderClasses())}"
        type=${ifDefined(this.type)}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${when(this.elevated, () => this.renderElevation())} ${when(this.outlined, () => this.renderOutline())}
        ${this.renderLabel()}
      </button>
    `;
  }

  protected renderElevation(): TemplateResult {
    return html` <span class="elevation"></span> `;
  }

  protected renderOutline(): TemplateResult {
    return html` <span class="outline"></span> `;
  }

  protected renderLabel(): TemplateResult {
    // TODO(b/272598771): remove the ternary when label property is removed
    return html`<div class="label">${this.label ? this.label : html`<slot></slot>`}</div>`;
  }

  protected getRenderClasses(): ClassInfo {
    return {};
  }

  protected handleClick(e: MouseEvent) {
    if (this.preventClickDefault) {
      e.preventDefault();
    }
  }

  protected handleBlur() {
    this.showFocusRing = false;
  }

  readonly #handleActivationClick = (event: MouseEvent) => {
    if (!isActivationClick(event)) {
      return;
    }

    this.focus();
    dispatchActivationClick(this.buttonElement);
  };

  override focus() {
    this.buttonElement.focus();
  }

  override blur() {
    this.buttonElement.blur();
  }
}
