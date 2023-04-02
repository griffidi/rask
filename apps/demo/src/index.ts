import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './index.css' assert { type: 'css' };

@customElement('app-index')
export class Index extends LitElement {
  static override styles = [styles];

  override render(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
