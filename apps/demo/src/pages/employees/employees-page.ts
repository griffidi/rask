import type { RouteEnterParams } from ':/router/index.js';
import { ContextProvider } from '@lit-labs/context';
import { Routes, type RouteConfig } from '@lit-labs/router';
import { scrollable } from '@rask/web/scrollable/scrollable.js';
import { LitElement, html, type TemplateResult } from 'lit';
import css from './employees-page.css' assert { type: 'css' };
import { routerContext } from './router-context.js';
import routes from './routes.js';

export class EmployeesPage extends LitElement {
  static override styles = [css];

  /**
   * Router for the employees page.
   */
  readonly #router = new Routes(this, routes);

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

  constructor() {
    super();

    this.#router.routes.map(
      route => (route.enter = params => this.#handleRouterEnter(params, route))
    );
  }

  override connectedCallback(): void {
    /**
     * this is a workaround for a bug in @lit-labs/router where
     * a child route's default path is not found.
     *
     * https://github.com/lit/lit/issues/3830
     */
    this.#router.goto(window.location.pathname);

    super.connectedCallback();
  }

  override render(): TemplateResult {
    return html`
      <div ${scrollable()}>
        <header>
          <span class="title">Employees</span>
          <!-- <rk-button
            filled
            blue>
            Add Employee
          </rk-button> -->
        </header>
        <output>${this.#router.outlet()}</output>
      </div>
    `;
  }

  async #handleRouterEnter(params: RouteEnterParams, route: RouteConfig) {
    console.log('entering route', params, route);

    return true;
  }
}

if (!customElements.get('app-employees-page')) {
  customElements.define('app-employees-page', EmployeesPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employees-page': EmployeesPage;
  }
}
