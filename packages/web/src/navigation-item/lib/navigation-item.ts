import '@material/web/icon/icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { createNavigationItemClickedEvent } from './events.js';
import css from './navigation-item.css' assert { type: 'css' };
import type { NavItem } from './types.js';

export class NavigationItem extends LitElement {
  static override styles = css;

  // get isFooterItem(): boolean {
  //   const { icon = '' } = this.item;
  //   return /.[a-z]*$/.test(icon);
  // }

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Object }) item: Readonly<NavItem> | undefined;

  // override render(): TemplateResult {
  //   if (this.#isInvalidItem()) {
  //     return html``;
  //   }

  //   return this.isFooterItem ? this.renderExternalNavItem() : this.renderNavItem();
  // }

  override render(): TemplateResult {
    const { icon, label, path } = this.item;

    return html`
      <a
        tabindex="0"
        href=${path}
        @click=${this.#handleClick}>
        <md-icon>${icon}</md-icon>
        <span>${label}</span>
        <div class="active-indicator"></div>
      </a>
    `;
  }

  protected renderExternalNavItem(): TemplateResult {
    const { icon, path } = this.item;

    return html`
      <a
        class="logo"
        target="_blank"
        href=${path}>
        <img
          src=${icon}
          alt="NavigationItem"
          width="22px"
          height="22px" />
      </a>
    `;
  }

  // #isInvalidItem(): boolean {
  //   const { icon, label, path } = this.item;

  //   return isEmpty(icon) || isEmpty(label) || isEmpty(path);
  // }

  #handleClick(): void {
    this.dispatchEvent(createNavigationItemClickedEvent(this.item));
  }
}
