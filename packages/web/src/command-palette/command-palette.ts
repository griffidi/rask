import { customElement } from 'lit/decorators.js';
import { CommandPalette } from './lib/command-palette.js';

@customElement('rk-command-palette')
export class RkCommandPalette extends CommandPalette {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-command-palette': RkCommandPalette;
  }
}
