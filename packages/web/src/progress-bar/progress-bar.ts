import { customElement } from 'lit/decorators.js';
import { ProgressBar } from './lib/progress-bar.js';

@customElement('rk-progress-bar')
export class RkProgressBar extends ProgressBar {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-progress-bar': RkProgressBar;
  }
}
