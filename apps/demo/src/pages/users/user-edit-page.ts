import type { User } from '#/common/models/user.js';
import { UserService } from '#/common/services/user-service.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { useInject } from '@rask/core/di/inject.js';
import '@rask/web/button/button.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
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
    () => [this.userId]
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
          <rk-text-field label="Full Name" .value=${user.fullName}></rk-text-field>
          <rk-text-field label="Email" .value=${user.email}></rk-text-field>
          <rk-text-field label="Phone" .value=${user.phone}></rk-text-field>
        </div>
        <div>
          <rk-text-field label="Street Address" .value=${user.streetAddress}></rk-text-field>
          <div class="address">
            <rk-text-field label="City" .value=${user.city}></rk-text-field>
            <rk-text-field label="State" .value=${user.state}></rk-text-field>
            <rk-text-field label="Postal" .value=${user.postal}></rk-text-field>
          </div>
        </div>
      </form>
      <footer>
        <rk-button label="Save" filled></rk-button>
        <rk-button label="Cancel" outlined></rk-button>
      </footer>
    `;
  }

  protected renderSkeleton(): TemplateResult {
    return html`<rk-skeleton label large width="100px"></rk-skeleton>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-user-edit-page': UserEditPage;
  }
}
