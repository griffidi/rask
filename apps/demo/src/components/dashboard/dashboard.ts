import { LitElement, html, type TemplateResult } from 'lit';
import css from './dashboard.css' assert { type: 'css' };

export class Dashboard extends LitElement {
  static override styles = [css];

  override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}

if (!customElements.get('app-dashboard')) {
  customElements.define('app-dashboard', Dashboard);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-dashboard': Dashboard;
  }
}
