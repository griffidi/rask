import '@rask/web/accordion/accordion.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import css from './home-page.css' assert { type: 'css' };

@customElement('app-home-page')
export class HomePage extends LitElement {
  static override styles = css;

  @state() value = 0;

  override render(): TemplateResult {
    return html``;
  }

  #renderChart(id: string): TemplateResult {
    return html`
      <div class="chart-container">
        <canvas
          id="${id}"
          width="100%"
          height="100%"
          class="chart"></canvas>
      </div>
      s
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
