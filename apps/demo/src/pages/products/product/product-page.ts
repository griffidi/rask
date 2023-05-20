import { GetProductByIdDocument, type Product } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { inject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import css from './product-page.css' assert { type: 'css' };

export class ProductPage extends LitElement {
  static override styles = [css];

  #client = inject(Client);
  #task = new Task(
    this,
    async ([id]) => await this.#loadProduct(id),
    () => [this.productId]
  );

  @property() productId!: string;

  override render(): TemplateResult {
    return html`
      ${this.#task.render({
        pending: () => this.#renderSkeleton(),
        complete: product => this.#renderProduct(product),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  #renderProduct(product: Product): TemplateResult {
    return html`
      <form>
        <fieldset>
          <label>Name</label>
          <md-outlined-text-field .value=${product.name}></md-outlined-text-field>
        </fieldset>
      </form>
    `;
  }

  #renderSkeleton(): TemplateResult {
    return html`
      <div class="container"></div>
    `;
  }

  async #loadProduct(id: string) {
    const { product } = await this.#client.query(GetProductByIdDocument, { variables: { id } });
    return product as Product;
  }
}

if (!customElements.get('app-product-page')) {
  customElements.define('app-product-page', ProductPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-product-page': ProductPage;
  }
}
