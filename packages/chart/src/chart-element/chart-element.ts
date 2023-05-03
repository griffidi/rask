import type { ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import css from './chart-element.css' assert { type: 'css' };

export class ChartElement extends LitElement {
  static override styles = css;

  #chart: Chart;

  @property() type: ChartType;
  @property() data: ChartData | undefined;
  @property() options: ChartOptions;

  @query('canvas') protected canvas!: HTMLCanvasElement;

  override firstUpdated(): void {
    const data: ChartData = this.data ?? ({} as ChartData);
    const options: ChartOptions = this.options ?? {};

    if (!this.#chart) {
      const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

      this.#chart = new Chart(ctx, {
        type: this.type,
        data,
        options,
      });
    }
  }

  override render(): void | TemplateResult {
    return html`
      <div class="chart-size">
        <canvas></canvas>
      </div>
    `;
  }
}

if (!customElements.get('rk-chart-element')) {
  customElements.define('rk-chart-element', ChartElement);
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-chart-element': ChartElement;
  }
}
