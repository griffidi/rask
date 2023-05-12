import { GetUserByIdDocument, type User } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { inject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import css from './user-page.css' assert { type: 'css' };

export class UserPage extends LitElement {
  static override styles = css;

  #client = inject(Client);

  #getUsers = new Task(
    this,
    async () => await this.#loadUser(),
    () => [null]
  );

  @property() userId: string | undefined;

  override render(): TemplateResult {
    return html`
      ${this.#getUsers.render({
        pending: () => this.renderSkeleton(),
        complete: user => this.renderUser(user),
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
          <rk-text-field
            label="Full Name"
            .value=${user.firstName}></rk-text-field>
          <rk-text-field
            label="Full Name"
            .value=${user.lastName}></rk-text-field>
          <rk-text-field
            label="Email"
            .value=${user.email}></rk-text-field>
        </div>
      </form>
      <footer>
        <rk-button
          label="Save"
          filled></rk-button>
        <rk-button
          label="Cancel"
          outlined></rk-button>
      </footer>
    `;
  }

  protected renderSkeleton(): TemplateResult {
    return html`
      <rk-skeleton
        label
        large
        width="100px"></rk-skeleton>
    `;
  }

  async #loadUser(): Promise<User> {
    try {
      // const { id } = this.location.params;
      const id = '';
      const { user } = await this.#client.query(GetUserByIdDocument, { variables: { id } });

      return user as User;
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded user.' });
      throw new Error();
    }
  }
}

if (!customElements.get('app-user-page')) {
  customElements.define('app-user-page', UserPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-user-page': UserPage;
  }
}
