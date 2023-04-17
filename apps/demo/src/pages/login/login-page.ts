import { LoginDocument } from '#/types/graphql.js';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';
import { useInject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { Client } from '@rask/graphql/client/client.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/button/button.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import css from './login-page.css' assert { type: 'css' };

@customElement('app-login-page')
export class LoginPage extends LitElement {
  static override styles = [css];

  #authService = useInject(AuthService);
  #client = useInject(Client);
  #userName: string = '';
  #password: string = '';

  override firstUpdated(): void {
    const userNameEl = this.shadowRoot.querySelector<HTMLInputElement>('input[placeholder="User name"]');
    userNameEl.focus();
  }

  override render(): TemplateResult {
    return html`
      <form method="submit" @submit=${this.#login}>
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

  async #login(): Promise<void> {
    // TODO live directive not working
    // await this.updateComplete;
    const userName = this.#userName;
    const password = this.#password;
    // const success = await this.#authService.login(userName, password);
    const { data: token } = await this.#client.query<string>({
      query: LoginDocument,
      variables: { userName, password },
    });
    this.#authService.setToken(token);

    if (token) {
      // this.router.goto(RouteTypes.home);
    }
  }

  #getUserNameInputValue(): string {
    return this.#userName;
  }

  #getPasswordInputValue(): string {
    return this.#password;
  }

  #handleUserNameInput({ target: input }: TypeEvent<HTMLInputElement>): void {
    this.#userName = input.value;
  }

  #handlePasswordInput({ target: input }: TypeEvent<HTMLInputElement>): void {
    this.#password = input.value;
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
