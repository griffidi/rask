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
import { provide } from '@lit-labs/context';
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
import { attachRouter } from './router/index.js';

const cache = useCache();
const { uri: GRAPHQL_URI } = config.graphql;

cache.set(GRAPHQL_URI_CACHE_KEY, GRAPHQL_URI);

export class Index extends LitElement {
  static override styles = css;

  #authService = inject(AuthService);
  #nav: Ref<Nav> = createRef();

  @provide({ context: isAuthenticatedContext }) isAuthenticated: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();

    if (window.addEventListener) {
      window.addEventListener('vaadin-router-error', this.#handleRouterError);
    }

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

    if (window.removeEventListener) {
      window.removeEventListener('vaadin-router-error', this.#handleRouterError);
    }
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

  #handleRouterError(e: Event): void {
    console.error('Router error', e);
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
