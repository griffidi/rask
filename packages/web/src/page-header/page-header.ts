import { customElement } from 'lit/decorators.js';
import { PageHeader } from './lib/page-header.js';

@customElement('rk-page-header')
export class RkPageHeader extends PageHeader {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-page-header': RkPageHeader;
  }
}
