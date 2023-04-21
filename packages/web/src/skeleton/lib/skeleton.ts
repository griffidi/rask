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
