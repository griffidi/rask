import { GetProductSalesDocument, type ProductSale } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@rask/chart/chart-element/chart-element.js';
import { unique } from '@rask/core/common/util/array.js';
import { useInject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import { Colors } from '@rask/web/css/variables.custom.js';
import toast from '@rask/web/notifications/toast.js';
import { type ChartData } from 'chart.js/auto';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { Dashboard } from '../dashboard.js';
import css from './product-sales-quantity.css' assert { type: 'css' };

export class ProductSalesQuantity extends Dashboard {
  static override styles = [
    ...super.styles,
    css,
  ];

  #client = useInject(Client);
  #task = new Task(
    this,
    async () => await this.#loadData(),
    () => [null]
  );

  @state() protected sales: ProductSale[] | undefined;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <span class="title">Product Sales by Quantity</span>
        ${this.#task.render({
          pending: () => this.#renderSkeleton(),
          complete: (sales: ProductSale[]) => this.#renderChart(sales),
          error: () => this.#renderError(),
        })}
      </div>
    `;
  }

  #renderChart(sales: ProductSale[]): TemplateResult {
    const labels = unique(sales.map(sale => sale.product.name));
    const salesData = labels.map(label => sales.find(sale => sale.product.name === label)?.quantity ?? 0);
    const data: ChartData = {
      labels,
      datasets: [
        {
          label: 'Top Product Sales',
          backgroundColor: [
            Colors.blue,
            Colors.purple,
            Colors.hotPink,
            Colors.green,
            Colors.yellow,
            Colors.red,
          ],
          // borderColor: 'rgb(255, 99, 132)',
          data: salesData,
        },
      ],
    };

    return html`
      <rk-chart-element
        type="pie"
        .data=${data}></rk-chart-element>
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

  async #loadData() {
    const { productSales } = await this.#client.query(GetProductSalesDocument);

    if (!productSales) {
      toast.error({ message: 'Failed to load Top Product Sales data' });
      throw new Error();
    }

    // this.sales = productSales as ProductSale[] | undefined;
    return productSales as ProductSale[] | undefined;
  }
}

if (!customElements.get('app-product-sales-quantity')) {
  customElements.define('app-product-sales-quantity', ProductSalesQuantity);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-product-sales-quantity': ProductSalesQuantity;
  }
}
