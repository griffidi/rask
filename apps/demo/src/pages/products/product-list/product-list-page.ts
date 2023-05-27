import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import { inject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { map } from 'lit/directives/map.js';
import { GetProductsDocument, type Product } from '../../../types/graphql.js';
import { routerContext } from '../router-context.js';
import css from './product-list-page.css' assert { type: 'css' };

export class ProductListPage extends LitElement {
  static override styles = [css];

  #client = inject(Client);

  /**
   * Task to load employees.
   */
  #task = new Task(
    this,
    async () => await this.#loadProducts(),
    () => [null]
  );

  /**
   * Products router context.
   */
  @consume({ context: routerContext }) router: Router;

  override render(): TemplateResult {
    return html`
      ${this.#task.render({
        pending: () => this.#renderSkeleton(),
        complete: products => this.#renderProducts(products),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  #renderProducts(products: Product[]): TemplateResult {
    return html`
      <div class="container">
        ${map(products, product => {
          return html`
            <div
              class="card"
              @click=${() => this.#handleCardClick(product.id)}>
              <div class="content">
                <span class="title">${product.name}</span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  #renderSkeleton(): TemplateResult {
    return html`
      Loading...
    `;
  }

  async #loadProducts() {
    const { products } = await this.#client.query(GetProductsDocument);
    return products as Product[];
  }

  #handleCardClick(productId: string) {
    this.router.goto(`/products/${productId}`);
  }
}

if (!customElements.get('app-product-list-page')) {
  customElements.define('app-product-list-page', ProductListPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-product-list-page': ProductListPage;
  }
}
