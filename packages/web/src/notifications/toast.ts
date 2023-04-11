import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './toast.css' assert { type: 'css' };

@customElement('rk-toast')
export class Toast extends LitElement {
  static override styles = [css];

  @property({ type: Boolean }) closeButton = true;

  override render(): TemplateResult {
    return html`
      <output class="rk-toast">
        <slot></slot>
      </output>
    `;
  }

  #addToast(): void {
    const toast = document.createElement('output');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rk-toast': Toast;
  }
}
