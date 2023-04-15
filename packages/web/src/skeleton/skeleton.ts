import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './skeleton.css' assert { type: 'css' };

export enum SKELETON_TYPE {
  CIRCLE = 'circle',
  TEXT = 'text',
  RECTANGLE = 'rectangle',
}

/**
 * @cssprop [--fds-skeleton-width=162px] - Height of the skeleton
 * @cssprop [--fds-skeleton-height=162px]- Width of the skeleton
 * @cssprop [--fds-skeleton-placeholder-color=var(--fds-on-surface-medium)]- Color of placeholder.
 * @cssprop [--fds-skeleton-background=var(--fds-surface-selected)] - Background color of the skeleton.
 *
 * @attr {string} [height] - Height of the skeleton
 * @attr {string} [width] - Width of the skeleton
 * @attr {circle|text|rectangle} [type=text] - Define the type of skeleton
 * @attr {h1|h2|h3|h4|h5|h6|small|p} [size=p] - Define the size of skeleton
 */
@customElement('rk-skeleton')
export class Skeleton extends LitElement {
  static override styles = [css];

  @property({ type: String, reflect: true })
  type: 'circle' | 'rectangle' | 'text' = 'text';

  @property({ type: String, reflect: true })
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' = 'p';

  @property({ type: String })
  width?: string;

  @property({ type: String })
  height?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#updateWidth();
    this.#updateHeight();
  }

  override willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('width')) this.#updateWidth();
    if (_changedProperties.has('height')) this.#updateHeight();
  }

  override render() {
    return html``;
  }

  #updateWidth() {
    if (this.width) this.style.setProperty('width', this.width);
  }

  #updateHeight() {
    if (this.height) this.style.setProperty('height', this.height);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-skeleton': Skeleton;
  }
}
