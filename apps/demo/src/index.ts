import '#/components/nav/nav.js';
import type { Nav } from '#/components/nav/nav.js';
import '#/components/search/search.js';
import '#/layout/footer/footer.js';
import '#/layout/header/header.js';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { useCache } from '@rask/core/cache/index.js';
import { GRAPHQL_URI_CACHE_KEY } from '@rask/graphql/constants/graphql-uri-cache-key.js';
import { apolloClient } from '@rask/graphql/decorators/apollo-client.js';
import '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import config from '../app.config.js';
import css from './index.css' assert { type: 'css' };
import { attachRouter } from './router/index.js';

const { uri: GRAPHQL_URI } = config.graphql;

const cache = useCache();
cache.set(GRAPHQL_URI_CACHE_KEY, GRAPHQL_URI);

@customElement('app-index')
export class Index extends LitElement {
  static override styles = [css];

  #nav: Ref<Nav> = createRef();

  @apolloClient({ uri: GRAPHQL_URI })
  readonly client!: ApolloClient<NormalizedCacheObject>;

  override firstUpdated(): void {
    const output = this.shadowRoot.querySelector<HTMLElement>('output');

    attachRouter(output);
  }

  override render(): TemplateResult {
    return html`
      <main role="main">
        <app-header @menu-clicked=${this.#showDrawer}></app-header>
        <article><output></output></article>
      </main>
      <app-nav ${ref(this.#nav)}></app-nav>
      <app-search></app-search>
    `;
  }

  #showDrawer(): void {
    this.#nav.value.show();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
