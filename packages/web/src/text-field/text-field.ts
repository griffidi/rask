import { customElement } from 'lit/decorators.js';
import { TextField } from './lib/text-field.js';

/**
 * A text field component.
 */
@customElement('rk-text-field')
export abstract class RkTextField extends TextField {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-text-field': RkTextField;
  }
}
