import { GetUserByIdDocument, type User } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './user-page.css' assert { type: 'css' };

@customElement('app-user-page')
export class UserPage extends LitElement {
  static override styles = css;

  #getUsers = new Task(
    this,
    async () => await this.#loadUser(),
    () => [this.userId]
  );

  @property() userId: string | undefined;

  // TODO: need to change how variable is passed
  @apolloQuery({ query: GetUserByIdDocument, variables: { id: '' } }) private readonly query: User;

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
          <rk-text-field label="Full Name" .value=${user.firstName}></rk-text-field>
          <rk-text-field label="Full Name" .value=${user.lastName}></rk-text-field>
          <rk-text-field label="Email" .value=${user.email}></rk-text-field>
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

  async #loadUser(): Promise<User> {
    try {
      return await this.query;
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded user.' });
      throw new Error();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-user-page': UserPage;
  }
}
