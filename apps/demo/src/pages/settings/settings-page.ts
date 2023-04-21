import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import css from './settings-page.css' assert { type: 'css' };

@customElement('app-settings-page')
export class SettingsPage extends LitElement {
  static override styles = css;

  override render(): TemplateResult {
    return html`<h1>Settings</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-settings-page': SettingsPage;
  }
}
