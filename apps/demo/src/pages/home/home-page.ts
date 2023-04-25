import '@rask/web/accordion/accordion.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import css from './home-page.css' assert { type: 'css' };

@customElement('app-home-page')
export class HomePage extends LitElement {
  static override styles = css;

  @state() value = 0;

  override render(): TemplateResult {
    return html`
      <div class="container">
        <rk-accordion>
          <div slot="headline">Account Stuff</div>
          <span>
            Accounting is the systematic process of recording, classifying, and summarizing financial transactions to
            provide an accurate picture of a business's financial health. It involves analyzing and interpreting
            financial data to make informed decisions and assess the overall performance of a company. Accounting plays
            a crucial role in business management and is essential for the success and growth of any organization.
          </span>
        </rk-accordion>
        <rk-accordion>
          <div slot="headline">Inventory Stuff</div>
          <span>
            Accounting is the systematic process of recording, classifying, and summarizing financial transactions to
            provide an accurate picture of a business's financial health. It involves analyzing and interpreting
            financial data to make informed decisions and assess the overall performance of a company. Accounting plays
            a crucial role in business management and is essential for the success and growth of any organization.
          </span>
        </rk-accordion>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
