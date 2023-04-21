import { customElement } from 'lit/decorators.js';
import { Button } from './lib/button.js';

/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment.
 *
 * @example
 * ```ts
 * import '@rask/web/button/button.js';
 *
 * html`
 *  <rk-button label="Save"></rk-button>
 *  <rk-button label="Save" filled></rk-button>
 *  <rk-button label="Save" outlined></rk-button>
 * `;
 *
 * css`
 *  --rk-button-color: #42b883;
 *  --rk-button-on-color: #42b883;
 *  --rk-button-shadow: 66, 184, 131;
 * `;
 * ```
 */
@customElement('rk-button')
export class RkButton extends Button {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-button': RkButton;
  }
}
