import { delay } from '@rask/core/reactivity/timer/delay.js';
import '@rask/web/progress-bar/progress-bar.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import css from './home-page.css' assert { type: 'css' };

@customElement('app-home-page')
export class HomePage extends LitElement {
  static override styles = css;

  @state() value = 0;

  override render(): TemplateResult {
    return html`
      <button @click=${this.#updateValue}>Update Value</button>
      <rk-progress-bar .value=${this.value}></rk-progress-bar>
      <!-- <span>Home Page</span> -->
    `;
  }

  async #updateValue(): Promise<void> {
    let i = 0;

    while (i < 100) {
      i += 4;
      this.value = i;
      await delay(200);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
