import { type ARIARole } from '@material/web/types/aria.js';
import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { createListItemClickedEvent } from './events.js';
import css from './list-item.css' assert { type: 'css' };

interface ListItemSelf {
  active: boolean;
  disabled: boolean;
  text: string;
}

export type ListItem = HTMLElement & ListItemSelf;

export class ListItemEl extends LitElement implements ListItem {
  static override styles = css;

  #isFirstUpdate = true;

  @property() override ariaSelected!: 'false' | 'true';
  @property() override ariaChecked!: 'false' | 'true';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() headline = '';
  @property({ type: Number }) itemTabIndex = -1;
  @property({ type: Boolean, attribute: 'rk-list-item', reflect: true }) isListItem = true;
  @property() supportingText = '';
  @property() type: ARIARole = 'listitem';

  /**
   * Only meant to be overridden by subclassing and not by the user. This is
   * so that we have control over focus on specific variants such as disabling
   * focus on <md-autocomplete-item> but enabling it for <md-menu-item>.
   */
  protected focusOnSelection = true;

  @query('.list-item') protected listItemRoot!: HTMLElement;

  // @state() hasFocus = false;

  get text(): string {
    return this.headline;
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('active') && !this.disabled) {
      if (this.active) {
        this.itemTabIndex = 0;

        // if (this.focusOnSelection) {
        //   this.hasFocus = true;
        // }

        // Do not reset anything if it's the first render because user could
        // have set `itemTabIndex` manually.
      } else if (!this.#isFirstUpdate) {
        this.itemTabIndex = -1;
      }
    }
  }

  override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    // will focus the list item root if it is selected but not on the first
    // update or else it may cause the page to jump on first load.
    if (changed.has('active') && !this.#isFirstUpdate && this.active && this.focusOnSelection) {
      this.focus();
    }

    this.#isFirstUpdate = false;
  }

  override render(): TemplateResult {
    return this.renderListItem(html`
      <div class="content">${this.renderStart()} ${this.renderBody()} ${this.renderEnd()}</div>
    `);
  }

  protected renderListItem(content: unknown): TemplateResult {
    return html`
      <li
        aria-selected=${this.ariaSelected || nothing}
        aria-checked=${this.ariaChecked || nothing}
        class="list-item ${classMap(this.getRenderListItemClasses())}"
        role=${this.type}
        tabindex=${this.disabled ? -1 : this.itemTabIndex}
        @pointerdown=${this.onPointerdown}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @click=${this.onClick}
        @pointerenter=${this.onPointerenter}
        @pointerleave=${this.onPointerleave}
        @keydown=${this.onKeydown}>
        ${content}
      </li>
    `;
  }

  protected renderStart(): TemplateResult {
    return html`
      <slot name="start"></slot>
    `;
  }

  protected renderBody(): TemplateResult {
    return html`
      <div class="body">
        <span class="headline">${this.headline}</span>
        ${when(this.supportingText, () => this.renderSupportingText())}
      </div>
    `;
  }

  protected renderSupportingText(): TemplateResult {
    return html`
      <span class="supporting-text">${this.supportingText}</span>
    `;
  }

  protected renderEnd(): TemplateResult {
    return html`
      <slot name="end"></slot>
    `;
  }

  protected getRenderListItemClasses(): ClassInfo {
    return {
      // 'has-focus': this.hasFocus,
    };
  }

  override focus(): void {
    this.listItemRoot?.focus?.();
  }

  // protected onPointerdown() {
  //   this.hasFocus = true;
  // }

  // protected onFocus() {
  //   this.hasFocus = true;
  // }

  // protected onBlur() {
  //   this.hasFocus = false;
  // }

  protected onClick(_e: Event): void {
    this.dispatchEvent(createListItemClickedEvent(this));
  }

  // eslint-disable-next-line ts/no-unused-vars
  protected onPointerdown(_e: Event): void {}
  // eslint-disable-next-line ts/no-unused-vars
  protected onFocus(_e: Event): void {}
  // eslint-disable-next-line ts/no-unused-vars
  protected onBlur(_e: Event): void {}
  // eslint-disable-next-line ts/no-unused-vars
  protected onKeydown(_e: Event): void {}
  // eslint-disable-next-line ts/no-unused-vars
  protected onPointerenter(_e: Event): void {}
  // eslint-disable-next-line ts/no-unused-vars
  protected onPointerleave(_e: Event): void {}
}
