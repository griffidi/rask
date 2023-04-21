import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';
import { useCache } from '@rask/core/cache/index.js';
import { useInject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { USER_NAME_CACHE_KEY } from '@rask/identity/constants/user-name-cache-key.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/button/button.js';
import '@rask/web/text-field/text-field.js';
import type { RkTextField } from '@rask/web/text-field/text-field.js';
import { Router } from '@vaadin/router';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import css from './login-page.css' assert { type: 'css' };

const cache = useCache();

@customElement('app-login-page')
export class LoginPage extends LitElement {
  static override styles = css;

  #authService = useInject(AuthService);

  @state() private userName: string = '';
  @state() private password: string = '';

  override firstUpdated(): void {
    this.userName = cache.get<string>(USER_NAME_CACHE_KEY) ?? '';

    const selector = this.userName.length ? '#password' : '#userName';
    this.shadowRoot.querySelector<RkTextField>(selector)?.focus();
  }

  override render(): TemplateResult {
    return html`
      <form method="submit" @submit=${this.#login}>
        <header>
          <h3>Welcome</h3>
        </header>
        <section>
          <rk-text-field
            id="userName"
            required
            tabindex="0"
            label="User name"
            .value=${live(this.#getUserNameInputValue())}
            @change=${this.#handleInputChange}
            @input=${this.#handleUserNameInput}
            @keydown=${this.#handleInputKeydown}
          ></rk-text-field>
          <rk-text-field
            id="password"
            required
            tabindex="0"
            label="Password"
            type="Password"
            .value=${live(this.#getPasswordInputValue())}
            @change=${this.#handleInputChange}
            @input=${this.#handlePasswordInput}
            @keydown=${this.#handleInputKeydown}
          ></rk-text-field>
        </section>
        <footer>
          <button type="submit">Sign In</button>
        </footer>
      </form>
    `;
  }

  async #login(e: Event): Promise<void> {
    // stop form from submitting
    e.stopPropagation();
    e.preventDefault();

    const userName = this.userName;
    const password = this.password;
    const success = await this.#authService.login(userName, password);

    if (success) {
      cache.set(USER_NAME_CACHE_KEY, userName);
      Router.go('/');
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

  #handleInputKeydown({ key }: KeyboardEvent): void {
    if (key === 'Enter') {
      this.#login(new Event('submit'));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-login-page': LoginPage;
  }
}
