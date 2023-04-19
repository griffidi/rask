import { RouteTypes } from '#/router/route-types.js';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';
import { useCache } from '@rask/core/cache/index.js';
import { useInject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { USER_NAME_CACHE_KEY } from '@rask/identity/constants/user-name-cache-key.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/button/button.js';
import { Router } from '@vaadin/router';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import css from './login-page.css' assert { type: 'css' };

const cache = useCache();

@customElement('app-login-page')
export class LoginPage extends LitElement {
  static override styles = [css];

  #authService = useInject(AuthService);

  @state() private userName: string = '';
  @state() private password: string = '';

  override firstUpdated(): void {
    const userName = cache.get<string>(USER_NAME_CACHE_KEY);
    let inputToFocus: HTMLInputElement | null = null;

    if (userName) {
      this.userName = userName;
      inputToFocus = this.shadowRoot.querySelector<HTMLInputElement>('input[placeholder="Password"]');
    } else {
      inputToFocus = this.shadowRoot.querySelector<HTMLInputElement>('input[placeholder="User name"]');
    }

    inputToFocus.focus();
  }

  override render(): TemplateResult {
    return html`
      <form type="submit" @submit=${this.#login}>
        <header>
          <h3>Welcome</h3>
        </header>
        <section>
          <label>
            <md-icon slot="leadingIcon">person</md-icon>
            <input
              type="text"
              placeholder="User name"
              required
              tabindex="0"
              .value=${live(this.#getUserNameInputValue())}
              @change=${this.#handleInputChange}
              @input=${this.#handleUserNameInput}
            />
          </label>
          <label>
            <md-icon slot="leadingIcon">lock</md-icon>
            <input
              type="password"
              placeholder="Password"
              required
              tabindex="0"
              .value=${live(this.#getPasswordInputValue())}
              @change=${this.#handleInputChange}
              @input=${this.#handlePasswordInput}
            />
          </label>
        </section>
        <footer>
          <button type="submit" tabindex="0">Sign In</button>
          <a>Forgot Password?</a>
        </footer>
      </form>
    `;
  }

  async #login(e: Event): Promise<void> {
    e.stopPropagation();
    e.preventDefault();

    // await this.updateComplete;
    const userName = this.userName;
    const password = this.password;
    const success = await this.#authService.login(userName, password);

    if (success) {
      cache.set(USER_NAME_CACHE_KEY, userName);
      Router.go(RouteTypes.home);
    }
  }

  #getUserNameInputValue(): string {
    return this.userName;
  }

  #getPasswordInputValue(): string {
    return this.password;
  }

  #handleUserNameInput({ target: input }: TypeEvent<HTMLInputElement>): void {
    this.userName = input.value;
  }

  #handlePasswordInput({ target: input }: TypeEvent<HTMLInputElement>): void {
    this.password = input.value;
  }

  #handleInputChange(): void {
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-login-page': LoginPage;
  }
}
