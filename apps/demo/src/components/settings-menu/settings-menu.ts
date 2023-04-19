import { RouteTypes } from '#/router/route-types.js';
import '@material/web/button/text-button.js';
import '@material/web/switch/switch.js';
import type { MdSwitch } from '@material/web/switch/switch.js';
import { useInject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/menu/menu.js';
import type { Menu } from '@rask/web/menu/menu.js';
import { useTheme } from '@rask/web/theme/index.js';
import { Router } from '@vaadin/router';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import css from './settings-menu.css' assert { type: 'css' };

const theme = useTheme();

@customElement('app-settings-menu')
export class SettingsMenu extends LitElement {
  static override styles = [css];

  #authService = useInject(AuthService);
  #menu: Ref<Menu> = createRef();

  @property({ attribute: false }) sittingsMenu: Ref<Menu> = createRef();
  @property({ type: Boolean }) themeDarkModeSelected = theme.isDark;

  override render(): TemplateResult {
    return html`
      <rk-menu ${ref(this.#menu)} icon="account_circle" .open>
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
        <div class="logout">
          <md-text-button @click=${this.#logout}>Logout</md-text-button>
        </div>
      </rk-menu>
    `;
  }

  #toggleTheme({ target }: TypeEvent<MdSwitch>): void {
    const themeColor = target.selected ? 'dark' : 'light';
    theme.set(themeColor);
  }

  #logout(): void {
    this.#menu.value.close();
    this.#authService.logout();
    Router.go(RouteTypes.login);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-settings-menu': SettingsMenu;
  }
}
