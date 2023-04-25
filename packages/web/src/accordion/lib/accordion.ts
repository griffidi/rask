import '@material/web/icon/icon.js';
import type { ARIAExpanded } from '@material/web/types/aria.js';
import type { TypeEvent } from '@rask/core/types/type-event.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import css from './accordion.css' assert { type: 'css' };

export class Accordion extends LitElement {
  static override styles = css;

  #animation: Animation | null = null;
  #isClosing = false;
  #isExpanding = false;

  @property() expanded: ARIAExpanded = 'false';

  @query('.content') private _content!: HTMLElement;
  @query('details') private _details!: HTMLDetailsElement;
  @query('summary') private _summary!: HTMLElement;

  override render(): TemplateResult {
    return html`
      <details aria-expanded=${this.expanded}>
        <summary @click=${this.#handleClick}>
          <slot name="headline"></slot>
          <slot name="icon">
            <md-icon class="button__toggle">expand_more</md-icon>
          </slot>
        </summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }

  #handleClick(e: TypeEvent<HTMLElement>): void {
    e.preventDefault();

    const details = this._details;
    const isOpen = details.open;

    details.style.overflow = 'hidden';

    if (this.#isClosing || !isOpen) {
      this.#open();
    } else if (this.#isExpanding || isOpen) {
      this.#close();
    }

    this.expanded = this.expanded === 'true' ? 'false' : 'true';
    // TODO: this is not working
    // details.focus();
  }

  #open(): void {
    const details = this._details;

    details.style.height = `${details.offsetHeight}px`;
    details.open = true;
    window.requestAnimationFrame(() => this.#expand());
  }

  #expand(): void {
    /**
     * get the current fixed height of the element
     * so that they can be used in the animation
     * keyframes
     */
    const startHeight = `${this._details.offsetHeight}px`;
    const endHeight = `${this._summary.offsetHeight + this._content.offsetHeight}px`;

    this.#isExpanding = true;

    this.#setAnimation(startHeight, endHeight, true, () => (this.#isExpanding = false));
  }

  #close(): void {
    /**
     * get the current fixed height of the element
     * so that they can be used in the animation
     * keyframes
     */
    const startHeight = `${this._details.offsetHeight}px`;
    const endHeight = `${this._summary.offsetHeight}px`;

    this.#isClosing = true;

    this.#setAnimation(startHeight, endHeight, false, () => (this.#isClosing = false));
  }

  #setAnimation(startHeight: string, endHeight: string, open: boolean, cancelFn: Function): void {
    // if there is already an animation running cancel it
    if (this.#animation) {
      this.#animation.cancel();
    }

    this.#animation = this._details.animate(
      {
        // set keyframes
        height: [
          startHeight,
          endHeight,
        ],
      },
      {
        duration: 400,
        easing: 'ease-out',
      }
    );

    this.#animation.onfinish = () => this.#onAnimationFinish(open);
    this.#animation.oncancel = cancelFn();
  }

  #onAnimationFinish(open: boolean): void {
    const details = this._details;

    details.open = open;

    /**
     * animation must be set to null to remove the onFinish and onCancel callbacks
     * or else memory leaks will occur with each animation
     */
    this.#animation = null;
    this.#isClosing = false;
    this.#isExpanding = false;

    // reset the height and overflow properties
    details.style.height = details.style.overflow = '';
  }
}
