import toast from '@rask/web/notifications/toast.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import css from './home-page.css' assert { type: 'css' };

@customElement('app-home-page')
export class HomePage extends LitElement {
  static override styles = css;

  @state() value = 0;

  override render(): TemplateResult {
    return html` <span>Home Page</span>`;
  }

  override firstUpdated(): void {
    toast.success({ title: 'Saved Client', message: 'You have updated the client.' });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HomePage;
  }
}
