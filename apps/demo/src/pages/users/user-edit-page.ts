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
          <rask-text-field label="Full Name" .value=${user.fullName}></rask-text-field>
          <rask-text-field label="Email" .value=${user.email}></rask-text-field>
          <rask-text-field label="Phone" .value=${user.phone}></rask-text-field>
        </div>
        <div>
          <rask-text-field label="Street Address" .value=${user.streetAddress}></rask-text-field>
          <div class="address">
            <rask-text-field label="City" .value=${user.city}></rask-text-field>
            <rask-text-field label="State" .value=${user.state}></rask-text-field>
            <rask-text-field label="Postal" .value=${user.postal}></rask-text-field>
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
