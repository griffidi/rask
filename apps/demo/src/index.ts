import ':/components/nav/nav.js';
import type { Nav } from ':/components/nav/nav.js';
import ':/components/search/search.js';
import ':/layout/footer/footer.js';
import ':/layout/header/header.js';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { provide } from '@lit-labs/context';
import { useCache } from '@rask/core/cache/index.js';
import { useInject } from '@rask/core/di/inject.js';
import { GRAPHQL_URI_CACHE_KEY } from '@rask/graphql/constants/graphql-uri-cache-key.js';
import { apolloClient } from '@rask/graphql/decorators/apollo-client.js';
import { isAuthenticatedContext } from '@rask/identity/authentication/is-authenticated-context.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import config from '../app.config.js';
import css from './index.css' assert { type: 'css' };
import { attachRouter } from './router/index.js';

const cache = useCache();
const { uri: GRAPHQL_URI } = config.graphql;

cache.set(GRAPHQL_URI_CACHE_KEY, GRAPHQL_URI);

@customElement('app-index')
export class Index extends LitElement {
  static override styles = css;

  #authService = useInject(AuthService);
  #nav: Ref<Nav> = createRef();

  @apolloClient({ uri: GRAPHQL_URI }) readonly client!: ApolloClient<NormalizedCacheObject>;

  @provide({ context: isAuthenticatedContext }) isAuthenticated: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();

    /**
     * subscribe to changes in authentication state and
     * update the isAuthenticated property so that consumers
     * will receive the new state.
     */
    this.#authService.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    /**
     * even though this is the root component, we unsubscribe
     * to make sure there is no references remaining in memory.
     * just for good practice. 😉
     */
    this.#authService.unsubscribe();
  }

  override async firstUpdated(): Promise<void> {
    const output = this.shadowRoot.querySelector<HTMLElement>('output');
    attachRouter(output);

    this.isAuthenticated = await this.#authService.isAuthenticated();
  }

  override render(): TemplateResult {
    return html`
      <main role="main">
        <app-header @menu-clicked=${this.#showDrawer}></app-header>
        <article><output id="route-outlet"></output></article>
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
