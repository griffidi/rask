import { useCrypto } from '@rask/core/crypto/index.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './index.css' assert { type: 'css' };

const crypto = useCrypto();

@customElement('app-index')
export class Index extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    const uuid = crypto.uuid;

    return html`
      <div>
        <span>UUID: ${uuid}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-index': Index;
  }
}
