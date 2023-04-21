import { customElement } from 'lit/decorators.js';
import { Skeleton } from './lib/skeleton.js';

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
@customElement('rk-skeleton')
export class RkSkeleton extends Skeleton {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-skeleton': RkSkeleton;
  }
}
