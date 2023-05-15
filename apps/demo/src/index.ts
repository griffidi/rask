/**
 * this patches the custom element registry and needs
 * to be the first import in the application.
 */
import 'redefine-custom-elements';

// import '@rask/core/hmr/patch-custom-element.js';

import ':/components/nav/nav.js';
import type { Nav } from ':/components/nav/nav.js';
import ':/components/search/search.js';
import ':/layout/footer/footer.js';
import ':/layout/header/header.js';
import { ContextProvider, provide } from '@lit-labs/context';
import { Router } from '@lit-labs/router';
import { useCache } from '@rask/core/cache/index.js';
import { inject } from '@rask/core/di/inject.js';
import { GRAPHQL_URI_CACHE_KEY } from '@rask/graphql/constants/graphql-uri-cache-key.js';
import { isAuthenticatedContext } from '@rask/identity/authentication/is-authenticated-context.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import config from '../app.config.js';
import css from './index.css' assert { type: 'css' };
import { routerContext } from './router/router-context.js';
import routes from './router/routes.js';

const cache = useCache();
const { uri: GRAPHQL_URI } = config.graphql;

cache.set(GRAPHQL_URI_CACHE_KEY, GRAPHQL_URI);

export class Index extends LitElement {
  static override styles = [css];

  #authService = inject(AuthService);
  #nav: Ref<Nav> = createRef();

  /**
   * This is the router for the application.
   */
  readonly #router = new Router(this, routes);

  /**
   * This is the provider for the router context. It is not used
   * in this component, but is subscribed to by other components
   * and therefore needs to be provided at the root of the application.
   */
  // @ts-ignore
  readonly #routerProvider = new ContextProvider(this, {
    context: routerContext,
    initialValue: this.#router,
  });

  @provide({ context: isAuthenticatedContext }) isAuthenticated: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();

    this.#router.routes.map(route => {
      route.enter = (params: { [key: string]: string | undefined }): boolean => {
        console.dir(params);
        return true;
      };
    });

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
    this.isAuthenticated = await this.#authService.isAuthenticated();
  }

  override render(): TemplateResult {
    return html`
      <main role="main">
        <app-header @menu-clicked=${this.#showDrawer}></app-header>
        <article>${this.#router.outlet()}</article>
      </main>
      <app-nav ${ref(this.#nav)}></app-nav>
      <app-search></app-search>
    `;
  }

  #showDrawer(): void {
    this.#nav.value.show();
  }
}

if (!customElements.get('app-index')) {
  customElements.define('app-index', Index);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
