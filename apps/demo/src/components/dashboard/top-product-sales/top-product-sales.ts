import { GetTopProductSalesByProductIdDocument, type ProductSale } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import { ProductIds } from '@rask/api/enums/product-ids.js';
import { useInject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import toast from '@rask/web/notifications/toast.js';
import { html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { Dashboard } from '../dashboard.js';
import css from './top-product-sales.css' assert { type: 'css' };

export class TopProductSales extends Dashboard {
  static override styles = [
    ...super.styles,
    css,
  ];

  #client = useInject(Client);
  #task = new Task(
    this,
    async ([id]) => await this.#loadData(id),
    () => [this.productId]
  );

  /**
   * The product ID to get sales for.
   */
  @property() productId: ProductIds | undefined;

  @state() protected sales: ProductSale[] | undefined;

  override render(): TemplateResult {
    return html`
      <div class="container">
        ${this.#task.render({
          pending: () => this.#renderSkeleton(),
          complete: () => this.#renderItems(),
          error: () => this.#renderError(),
        })}
      </div>
    `;
  }

  #renderItems(): TemplateResult {
    return html`
      <div>Product</div>
      <div>Quantity</div>
      <div>Size</div>
      <div class="container__items">${map(this.sales, item => this.#renderItem(item))}</div>
    `;
  }

  #renderItem(item: ProductSale): TemplateResult {
    const {
      product: { name: productName },
      quantity,
      size: { name: sizeName },
    } = item;

    return html`
      <div>${productName}</div>
      <div>${quantity}</div>
      <div>${sizeName}</div>
    `;
  }

  #renderSkeleton(): TemplateResult {
    return html`
      Loading
    `;
  }

  #renderError(): TemplateResult {
    return html`
      Error
    `;
  }

  async #loadData(productId: string) {
    const { productSales } = await this.#client.query(GetTopProductSalesByProductIdDocument, {
      variables: { productId },
    });

    if (!productSales) {
      toast.error({ message: 'Failed to load Top Product Sales data' });
      throw new Error();
    }

    this.sales = productSales as ProductSale[] | undefined;
  }
}

if (!customElements.get('app-top-product-sales')) {
  customElements.define('app-top-product-sales', TopProductSales);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-top-product-sales': TopProductSales;
  }
}
