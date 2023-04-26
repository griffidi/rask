import { type ARIARole } from '@material/web/types/aria.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { NAVIGABLE_KEYS, isNavigableKey } from '../../navigation/navigable.js';
import { createListChangeEvent } from './events.js';
import { type ListItem } from './list-item.js';
import css from './list.css' assert { type: 'css' };

export class List extends LitElement {
  static override shadowRootOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static override styles = css;

  @property() override ariaLabel!: string;
  @property({ type: Number }) listTabIndex = 0;
  @property() type: ARIARole = 'list';

  @queryAssignedElements({ flatten: true, selector: '[rk-list-item]' }) items!: ListItem[];

  @query('rk-list') listRoot!: HTMLElement;

  override render(): TemplateResult {
    return this.renderList();
  }

  protected renderList(): TemplateResult {
    return html`
      <ul
        ariaLabel=${this.ariaLabel}
        class="rk-list ${classMap(this.getRenderListClasses())}"
        role=${this.type}
        tabindex=${this.listTabIndex}
        @keydown=${this.#handleKeydown}>
        ${this.renderContent()}
      </ul>
    `;
  }

  protected renderContent(): TemplateResult {
    return html`
      <span><slot @click=${(e: Event) => e.stopPropagation()}></slot></span>
    `;
  }

  protected getRenderListClasses(): ClassInfo {
    return {};
  }

  #handleKeydown(e: KeyboardEvent): void {
    const { key } = e;

    if (!isNavigableKey(key)) {
      return;
    }
    // do not use this.items directly so we don't re-query the DOM unnecessarily
    const items = this.items;

    if (!items.length) {
      return;
    }

    const activeItemRecord = List.getActiveItem(items);

    if (activeItemRecord) {
      activeItemRecord.item.active = false;
    }

    // keydownHandler(event);
    e.preventDefault();

    switch (key) {
      // Activate the next item
      case NAVIGABLE_KEYS.ArrowDown:
        if (activeItemRecord) {
          const next = List.getNextItem(items, activeItemRecord.index);

          if (next) this.#setActiveListItem(next);
        } else {
          const first = List.activateFirstItem(items);
          this.#setActiveListItem(first);
        }
        break;

      // Activate the previous item
      case NAVIGABLE_KEYS.ArrowUp:
        if (activeItemRecord) {
          const prev = List.getPrevItem(items, activeItemRecord.index);
          if (prev) this.#setActiveListItem(prev);
        } else {
          // items[items.length - 1].active = true;
          this.#setActiveListItem(items[items.length - 1]);
        }
        break;

      // Activate the first item
      case NAVIGABLE_KEYS.Home:
        const first = List.activateFirstItem(items);
        this.#setActiveListItem(first);
        break;

      // Activate the last item
      case NAVIGABLE_KEYS.End:
        const last = List.activateLastItem(items);
        this.#setActiveListItem(last);
        break;

      default:
        break;
    }
  }

  #setActiveListItem(item: ListItem): void {
    if (item) {
      item.active = true;
      this.dispatchEvent(createListChangeEvent(item));
    }
  }

  static activateFirstItem<T extends ListItem>(items: T[]): ListItem {
    // NOTE: These selector functions are static and not on the instance such
    // that multiple operations can be chained and we do not have to re-query
    // the DOM
    const firstItem = List.getFirstActivatableItem(items);

    return firstItem;

    // if (firstItem) {
    //   firstItem.active = true;
    // }
  }

  static activateLastItem<T extends ListItem>(items: T[]): ListItem {
    const lastItem = List.getLastActivatableItem(items);

    return lastItem;
    // if (lastItem) {
    //   lastItem.active = true;
    // }
  }

  static deactivateActiveItem<T extends ListItem>(items: T[]) {
    const activeItem = List.getActiveItem(items);
    if (activeItem) {
      activeItem.item.active = false;
    }
    return activeItem;
  }

  override focus() {
    this.listRoot.focus();
  }

  static getActiveItem<T extends ListItem>(items: T[]) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.active) {
        return {
          item,
          index: i,
        };
      }
    }
    return null;
  }

  static getFirstActivatableItem<T extends ListItem>(items: T[]) {
    for (const item of items) {
      if (!item.disabled) {
        return item;
      }
    }

    return null;
  }

  static getLastActivatableItem<T extends ListItem>(items: T[]) {
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!item.disabled) {
        return item;
      }
    }

    return null;
  }

  protected static getNextItem<T extends ListItem>(items: T[], index: number) {
    for (let i = 1; i < items.length; i++) {
      const nextIndex = (i + index) % items.length;
      const item = items[nextIndex];
      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }

  protected static getPrevItem<T extends ListItem>(items: T[], index: number) {
    for (let i = 1; i < items.length; i++) {
      const prevIndex = (index - i + items.length) % items.length;
      const item = items[prevIndex];

      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }
}
