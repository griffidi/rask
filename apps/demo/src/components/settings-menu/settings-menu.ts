import { Task } from '@lit-labs/task';
import '@material/web/switch/switch.js';
import type { MdSwitch } from '@material/web/switch/switch.js';
import { inject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import { UserService } from '@rask/identity/services/user-service.js';
import '@rask/web/menu/menu.js';
import type { Menu } from '@rask/web/menu/menu.js';
import { useTheme } from '@rask/web/theme/index.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import css from './settings-menu.css' assert { type: 'css' };

const theme = useTheme();

export class SettingsMenu extends LitElement {
  static override styles = css;

  #getInitials = new Task(
    this,
    async () => await this.#loadUser(),
    () => [null]
  );

  #authService = inject(AuthService);
  #userService = inject(UserService);
  #menu: Ref<Menu> = createRef();

  @property({ attribute: false }) sittingsMenu: Ref<Menu> = createRef();
  @property({ type: Boolean }) themeDarkModeSelected = theme.isDark;

  @state() private initials = '';

  override render(): TemplateResult {
    return html`
      <rk-menu
        ${ref(this.#menu)}
        icon="account_circle">
        ${this.#renderMenuTrigger()}
        <label>
          Dark Mode
          <md-switch
            .selected="${this.themeDarkModeSelected}"
            @change="${this.#toggleTheme}">
            <md-icon>dark_mode</md-icon>
          </md-switch>
        </label>
        <label>
          Notifications
          <md-switch><md-icon>notification</md-icon></md-switch>
        </label>
        <div class="logout">
          <a @click=${this.#logout}>Logout</a>
        </div>
      </rk-menu>
    `;
  }

  #renderMenuTrigger(): TemplateResult {
    return html`
      ${this.#getInitials.render({
        complete: () =>
          html`
            <span
              slot="trigger"
              class="avatar">
              ${this.initials}
            </span>
          `,
      })}
    `;
  }

  async #loadUser(): Promise<void> {
    const user = await this.#userService.getCurrentUser();
    const { firstName, lastName } = user;

    this.initials = `${firstName[0]}${lastName[0]}`;
  }

  #toggleTheme({ target }: TypeEvent<MdSwitch>): void {
    const themeColor = target.selected ? 'dark' : 'light';
    theme.set(themeColor);
  }

  #logout(): void {
    this.#menu.value.close();
    this.#authService.logout();
    // Router.go(RouteTypes.login);
  }
}

if (!customElements.get('app-settings-menu')) {
  customElements.define('app-settings-menu', SettingsMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-settings-menu': SettingsMenu;
  }
}
