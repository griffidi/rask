import { LitElement, html, type TemplateResult } from 'lit';
import css from './settings-page.css' assert { type: 'css' };

export class SettingsPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`
      <h1>Settings</h1>
    `;
  }
}

if (!customElements.get('app-settings-page')) {
  customElements.define('app-settings-page', SettingsPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-settings-page': SettingsPage;
  }
}
