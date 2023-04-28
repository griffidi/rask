import '@rask/web/breadcrumb/breadcrumb-item.js';
import '@rask/web/breadcrumb/breadcrumb.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { RouteTypes } from '../../router/route-types.js';
import type { RouterLocationChangedEvent } from '../../router/types.js';
import css from './breadcrumb.css' assert { type: 'css' };

interface BreadcrumbPath {
  path: string;
  name: string;
}

@customElement('app-breadcrumb')
export class Breadcrumb extends LitElement {
  static override styles = css;

  @state() items: BreadcrumbPath[] | undefined;

  override connectedCallback(): void {
    super.connectedCallback();

    if (window.addEventListener) {
      window.addEventListener('vaadin-router-location-changed', e => this.#handleRouterLocationChanged(e));
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (window.removeEventListener) {
      window.removeEventListener('vaadin-router-location-changed', e => this.#handleRouterLocationChanged(e));
    }
  }

  override render(): TemplateResult {
    return html`
      <rk-breadcrumb>${when(this.items, () => this.#renderItems())}</rk-breadcrumb>
    `;
  }

  #renderItems(): TemplateResult {
    return html`
      ${map(this.items, ({ path, name }) => {
        return html`
          <rk-breadcrumb-item href="${path}">${name}</rk-breadcrumb-item>
        `;
      })}
    `;
  }

  #handleRouterLocationChanged({ detail }: RouterLocationChangedEvent) {
    const { routes } = detail.location;
    const items = routes
      .filter(route => route.name)
      .map(({ path, name }) => {
        return { path, name };
      });

    if (items[0].name !== RouteTypes.default) {
      items.unshift({ path: '/', name: RouteTypes.default });
    }

    this.items = items;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-breadcrumb': Breadcrumb;
  }
}
