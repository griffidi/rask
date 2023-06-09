import { GetProductSalesDocument, type ProductSale } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@rask/chart/chart-element/chart-element.js';
import { unique } from '@rask/core/common/util/array.js';
import { inject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import { Colors } from '@rask/web/css/variables.custom.js';
import toast from '@rask/web/notifications/toast.js';
import { type ChartData } from 'chart.js/auto';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { Dashboard } from '../dashboard.js';
import css from './top-product-sales.css' assert { type: 'css' };

export class TopProductSales extends Dashboard {
  static override styles = [
    ...super.styles,
    css,
  ];

  #client = inject(Client);
  #task = new Task(
    this,
    async () => await this.#loadData(),
    () => [null]
  );

  @state() protected sales: ProductSale[] | undefined;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <span class="title">Product Sales</span>
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
    const salesData = labels.map(
      label => sales.find(sale => sale.product.name === label)?.quantity ?? 0
    );
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
        type="bar"
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

if (!customElements.get('app-top-product-sales')) {
  customElements.define('app-top-product-sales', TopProductSales);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-top-product-sales': TopProductSales;
  }
}
