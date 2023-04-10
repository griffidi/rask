import { RouteTypes } from '#/router/route-types.js';
import '@material/web/button/text-button.js';
import '@material/web/switch/switch.js';
import type { MdSwitch } from '@material/web/switch/switch.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import '@rask/web/menu/menu.js';
import type { Menu } from '@rask/web/menu/menu.js';
import { useTheme } from '@rask/web/theme/index.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, type Ref } from 'lit/directives/ref.js';
import css from './settings-menu.css' assert { type: 'css' };

const theme = useTheme();

@customElement('app-settings-menu')
export class SettingsMenu extends LitElement {
  static override styles = [css];

  @property({ attribute: false }) sittingsMenu: Ref<Menu> = createRef();
  @property({ type: Boolean }) themeDarkModeSelected = theme.isDark;

  override render(): TemplateResult {
    return html`
      <rask-menu>
        <label>
          Dark Mode
          <md-switch .selected="${this.themeDarkModeSelected}" @change="${this.#toggleTheme}"
            ><md-icon>dark_mode</md-icon></md-switch
          >
        </label>
        <label>
          Notifications
          <md-switch><md-icon>notification</md-icon></md-switch>
        </label>
        <label>
          <md-text-button href=${RouteTypes.settings}>Settings</md-text-button>
        </label>
      </rask-menu>
    `;
  }

  #toggleTheme({ target }: TypeEvent<MdSwitch>): void {
    const themeColor = target.selected ? 'dark' : 'light';
    theme.set(themeColor);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-settings-menu': SettingsMenu;
  }
}
