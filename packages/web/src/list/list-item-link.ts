import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ListItemEl } from './list-item.js';

type LinkTarget = '_blank' | '_parent' | '_self' | '_top';

export class ListItemLink extends ListItemEl {
  @property() href: string | undefined;

  /**
   * Set the underlying `HTMLAnchorElement`'s `target` attribute.
   */
  @property() target!: string;

  protected override renderListItem(content: unknown) {
    return html`
      <a
        tabindex=${this.disabled ? -1 : this.itemTabIndex}
        aria-selected=${this.selected}
        aria-checked=${this.checked}
        class="list-item ${classMap(this.getRenderListItemClasses())}"
        href=${this.href}
        target=${(this.target as LinkTarget) || nothing}
        @pointerdown=${this.onPointerdown}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @click=${this.onClick}
        @pointerenter=${this.onPointerenter}
        @pointerleave=${this.onPointerleave}
        @keydown=${this.onKeydown}>
        ${content}
      </a>
    `;
  }
}

if (!customElements.get('rk-list-item-link')) {
  customElements.define('rk-list-item-link', ListItemLink);
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-list-item-link': ListItemLink;
  }
}
