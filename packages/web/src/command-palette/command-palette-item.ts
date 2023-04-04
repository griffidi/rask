import '@material/web/icon/icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import css from './command-palette-item.css' assert { type: 'css' };

@customElement('rask-command-palette-item')
export class CommandPaletteItem extends LitElement {
  static override styles = [css];

  @property({ type: String }) icon: string | undefined;
  @property({ type: String }) label: string;

  override render(): TemplateResult {
    return html`
      <label>
        <md-icon>${ifDefined(this.icon)}</md-icon>
        <div>${this.label}</div>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rask-command-palette-item': CommandPaletteItem;
  }
}
