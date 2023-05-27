import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import css from './skeleton.css' assert { type: 'css' };

export enum SKELETON_TYPE {
  CIRCLE = 'circle',
  TEXT = 'text',
  RECTANGLE = 'rectangle',
}

export type FontType = 'body' | 'display' | 'headline' | 'label' | 'label' | 'title';
export type FontScale = 'large' | 'medium' | 'small';

/**
 * @cssprop [--rk-skeleton-background=var(--md-ref-palette-neutral-variant-30)] - Background color of the skeleton.;
 * @cssprop [--rk-skeleton-line-height=normal] - Line height of the skeleton.;
 * @cssprop [--rk-skeleton-margin=1px] - Margin of the skeleton.;
 * @cssprop [--rk-skeleton-shape=var(--md-sys-shape-small)] - Shape of the skeleton.;
 *
 * @property {string} [height] - Height of the skeleton
 * @property {string} [width] - Width of the skeleton
 * @property {boolean} [circle] - Set shape to circle.
 * @property {boolean} [rectangle] - Set shape to rectangle.
 * @property {boolean} [text] - Set shape to text, which is similar to a rectangle,
 * but you can also set typescale to attributes to match the size with text it is mimicing.
 *
 * The below attributes are not properties of Skeleton, but are used to set the
 * typescale in css if the text property is true.
 * @attr [label] - Font type
 * @attr [body] - Font type
 * @attr [headline] - Font type
 * @attr [title] - Font type
 * @attr [display] - Font type
 * @attr [small] - Font scale
 * @attr [medium] - Font scale
 * @attr [large] - Font scale
 *
 * @example
 * ```ts
 * import '@rask/web/skeleton/skeleton.js';
 *
 * html`
 *  // default
 *  <rk-skeleton width="50px" height="20px"></rk-skeleton>
 *
 *  // set typescale. Use this for text skeletons
 *  // when you need the sizes to match.
 *  <rk-skeleton width="50px" height="20px" label large></rk-skeleton>
 *
 *  // circle skeleton
 *  <rk-skeleton circle></rk-skeleton>
 *
 *  // rectable skeleton
 *  <rk-skeleton rectable></rk-skeleton>
 *`;
 * ```
 */
export class Skeleton extends LitElement {
  static override styles = css;

  @property({ type: Boolean, reflect: true }) circle = false;
  @property({ type: Boolean, reflect: true }) rectangle = false;
  @property({ type: Boolean, reflect: true }) text = true;

  @property({ type: String }) width?: string;
  @property({ type: String }) height?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#updateWidth();
    this.#updateHeight();
  }

  override willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('width')) {
      this.#updateWidth();
    }

    if (_changedProperties.has('height')) {
      this.#updateHeight();
    }
  }

  override render(): TemplateResult {
    return html``;
  }

  // override render(): TemplateResult {
  //   return html`${this.#renderCustomProperties()}`;
  // }

  /**
   * Dynamically render custom properties used in CSS calculations.
   */
  // @ts-ignore
  #renderCustomProperties(): TemplateResult {
    const width = this.width?.length ? `--rk-skeleton-width: ${this.width}` : '';
    const height = this.width?.length ? `--rk-skeleton-height: ${this.height}` : '';

    return html`
      <style>
        :host {
           ${width};
            ${height};
        }
      </style>
    `;
  }

  #updateWidth() {
    if (this.width) this.style.setProperty('width', this.width);
  }

  #updateHeight() {
    if (this.height) this.style.setProperty('height', this.height);
  }
}

if (!customElements.get('rk-skeleton')) {
  customElements.define('rk-skeleton', Skeleton);
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-skeleton': Skeleton;
  }
}
