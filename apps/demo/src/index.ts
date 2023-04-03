import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './index.css' assert { type: 'css' };

@customElement('app-index')
export class Index extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html`app-index`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
