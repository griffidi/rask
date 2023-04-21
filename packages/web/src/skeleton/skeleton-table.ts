import { customElement } from 'lit/decorators.js';
import { SkeletonTable } from './lib/skeleton-table.js';

@customElement('rk-skeleton-table')
export class RkSkeletonTable extends SkeletonTable {}

declare global {
  interface HTMLElementTagNameMap {
    'rk-skeleton-table': RkSkeletonTable;
  }
}
