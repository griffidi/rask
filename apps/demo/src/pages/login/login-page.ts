import { RouteTypes } from '#/router/route-types.js';
import { routerContext } from '#/router/router-context.js';
import { consume } from '@lit-labs/context';
import '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';
import { useInject } from '@rask/core/di/inject.js';
import { AuthService } from '@rask/identity/services/auth-service.js';
import '@rask/web/button/button.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import css from './login-page.css' assert { type: 'css' };

@customElement('app-login-page')
export class LoginPage extends LitElement {
  static override styles = [css];

  #userName: string = '';
  #password: string = '';

  @consume({ context: routerContext })
  router: Router | undefined;

  private authService = useInject(AuthService);

  override render(): TemplateResult {
    return html`
      <form method="submit" @submit=${this.#login}>
        <header>
          <h3>Welcome</h3>
        </header>
        <section>
          <label>
            <md-icon slot="leadingIcon">person</md-icon>
            <input type="text" placeholder="User name" required .value=${live(this.#userName)} />
          </label>
          <label>
            <md-icon slot="leadingIcon">lock</md-icon>
            <input type="password" placeholder="Password" required .value=${live(this.#userName)} />
          </label>
        </section>
        <footer>
          <button type="submit">Sign In</button>
          <a>Forgot Password?</a>
        </footer>
      </form>
    `;
  }

  async #login(): Promise<void> {
    // TODO live directive not working
    const success = await this.authService.login(this.#userName, this.#password);

    if (success) {
      this.router.goto(RouteTypes.home);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-login-page': LoginPage;
  }
}
