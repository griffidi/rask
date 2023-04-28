import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import css from './breadcrumb-item.css' assert { type: 'css' };

export class BreadcrumbItem extends LitElement {
  static override styles = css;

  @property() href: string | undefined;

  override render(): TemplateResult {
    return html`
      <a href="${this.href}"><slot></slot></a>
    `;
  }
}
