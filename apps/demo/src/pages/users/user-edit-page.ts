import type { User } from '#/common/models/user.js';
import { UserService } from '#/common/services/user-service.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { useInject } from '@rask/core/di/inject.js';
import '@rask/web/button/button.js';
import '@rask/web/skeleton/skeleton.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './user-edit-page.css' assert { type: 'css' };

@customElement('app-user-edit-page')
export class UserEditPage extends LitElement {
  static override styles = [css];

  @property() userId: string | undefined;

  #userService = useInject(UserService);
  #getUsers = new Task(
    this,
    async ([id]) => await this.#userService.getUserById(id),
    () => [this.userId],
  );

  override render(): TemplateResult {
    return html`
      ${this.#getUsers.render({
        pending: () => this.renderSkeleton(),
        complete: (user) => this.renderUser(user),
      })}
    `;
  }

  protected renderUser(user: User): TemplateResult {
    return html`
      <header>
        <h2>Edit User</h2>
      </header>
      <form>
        <div>
          <label>
            Full Name
            <md-outlined-text-field .value=${user.fullName}></md-outlined-text-field>
          </label>
          <label>
            Email
            <md-outlined-text-field .value=${user.email}></md-outlined-text-field>
          </label>
          <label>
            Phone
            <md-outlined-text-field .value=${user.phone}></md-outlined-text-field>
          </label>
        </div>
        <div>
          <label>
            Street Address
            <md-outlined-text-field .value=${user.streetAddress}></md-outlined-text-field>
          </label>
          <div class="address">
            <label class="city">
              City
              <md-outlined-text-field .value=${user.city}></md-outlined-text-field>
            </label>
            <label class="state">
              State
              <md-outlined-text-field .value=${user.state}></md-outlined-text-field>
            </label>
            <label class="postal">
              Postal
              <md-outlined-text-field .value=${user.postal}></md-outlined-text-field>
            </label>
          </div>
        </div>
      </form>
      <footer>
        <rask-button label="Save" filled></rask-button>
        <rask-button label="Cancel" outlined></rask-button>
      </footer>
    `;
  }

  protected renderSkeleton(): TemplateResult {
    return html`<rask-skeleton label large width="100px"></rask-skeleton>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-user-edit-page': UserEditPage;
  }
}
