import { customElement } from 'lit/decorators.js';
import { Accordion } from './lib/accordion.js';

@customElement('rk-accordion')
export class RkAccordion extends Accordion {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-accordion': RkAccordion;
  }
}
