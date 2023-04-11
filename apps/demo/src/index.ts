import '#/components/nav/nav.js';
import type { Nav } from '#/components/nav/nav.js';
import '#/components/search/search.js';
import '#/layout/footer/footer.js';
import '#/layout/header/header.js';
import { routerContext } from '#/router/router-context.js';
import routes from '#/router/routes.js';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ContextProvider } from '@lit-labs/context';
import { Router } from '@lit-labs/router';
import { apolloClient } from '@rask/graphql/decorators/apollo-client.js';
import '@rask/web/navigation-drawer/navigation-drawer.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import config from '../app.config.js';
import css from './index.css' assert { type: 'css' };

const { uri: GRAPHQL_URI } = config.graphql;

@customElement('app-index')
export class Index extends LitElement {
  static override styles = [css];

  #nav: Ref<Nav> = createRef();
  #router = new Router(this, routes);
  // @ts-ignore
  #routerProvider = new ContextProvider(this, {
    context: routerContext,
    initialValue: this.#router,
  });

  @apolloClient({ uri: GRAPHQL_URI })
  // @state()
  readonly client!: ApolloClient<NormalizedCacheObject>;

  override render(): TemplateResult {
    return html`
      <main>
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

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
