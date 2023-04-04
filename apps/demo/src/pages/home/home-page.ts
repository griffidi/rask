import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './home-page.css' assert { type: 'css' };

@customElement('app-home-page')
export class HomePage extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html`<h1>Home Page</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
