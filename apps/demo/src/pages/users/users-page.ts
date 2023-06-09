import { GetUsersDocument, type User } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import { inject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { Client } from '@rask/graphql/client/client.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './users-page.css' assert { type: 'css' };

const CARD_SELECTED_CLASS = 'selected';

export class UsersPage extends LitElement {
  static override styles = css;

  #client = inject(Client);

  #getUsers = new Task(
    this,
    async () => await this.#loadUsers(),
    () => [null]
  );

  @property({ type: Boolean, reflect: true }) exiting: boolean = false;
  @state() protected currentUser: User | undefined;

  override render(): TemplateResult {
    return html`
      ${this.#getUsers.render({
        pending: () => this.renderSkeleton(),
        complete: users => this.renderUsers(users),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  protected renderUsers(users: ReadonlyArray<Readonly<User>>): TemplateResult {
    return html`
      <div class="cards">${map(users, user => this.renderUser(user))}</div>
    `;
  }

  protected renderUser(user: Readonly<User>): TemplateResult {
    return html`
      <div class="card">
        <header>
          <!-- <img src="avatar.svg" alt="Avatar" width="50px" height="50px" /> -->
          <md-icon class="avatar">person</md-icon>
          <div class="user-name">
            <div class="title">${user.firstName} ${user.lastName}</div>
            <div class="subtitle">${user.role}</div>
          </div>
        </header>
        <section>
          <div class="contact-info">
            <label>
              <md-icon>mail</md-icon>
              ${user.email}
            </label>
          </div>
        </section>
        <footer>
          <rk-button
            label="Edit"
            outlined
            @click=${(e: TypeEvent) => this.#handleEditClick(e, user)}></rk-button>
        </footer>
      </div>
    `;
  }

  protected renderSkeleton(): TemplateResult {
    return html`
      <div class="cards">
        ${map(range(12), () => {
          return html`
            <div class="card">
              <header>
                <rk-skeleton
                  width="50px"
                  height="50px"
                  circle></rk-skeleton>
                <div class="user-name">
                  <rk-skeleton
                    width="146px"
                    title
                    large></rk-skeleton>
                  <rk-skeleton
                    width="75px"
                    label
                    large></rk-skeleton>
                </div>
              </header>
              <section>
                <div class="contact-info">
                  <label>
                    <rk-skeleton
                      width="22px"
                      body
                      medium></rk-skeleton>
                    <rk-skeleton
                      width="188px"
                      body
                      medium></rk-skeleton>
                  </label>
                  <label>
                    <rk-skeleton
                      width="22px"
                      body
                      medium></rk-skeleton>
                    <rk-skeleton
                      width="150px"
                      body
                      medium></rk-skeleton>
                  </label>
                </div>
              </section>
              <footer>
                <rk-skeleton
                  width="62px"
                  button></rk-skeleton>
              </footer>
            </div>
          `;
        })}
      </div>
    `;
  }

  async #loadUsers(): Promise<User[]> {
    try {
      const { users } = await this.#client.query(GetUsersDocument);
      return users as User[];
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded users.' });
      throw new Error();
    }
  }

  #handleEditClick({ target }: TypeEvent, user: User): void {
    this.currentUser = user;

    const cardEl = target.closest<HTMLElement>('.card');
    // cardEl.classList.add(CARD_SELECTED_CLASS);
    cardEl.setAttribute(CARD_SELECTED_CLASS, '');

    this.exiting = true;

    const animationendHandle = () => {
      cardEl.removeEventListener('animationend', animationendHandle);
      // this.router.goto(RouteTypes.userEdit.replace(/:id/, user.id));
    };

    cardEl.addEventListener('animationend', animationendHandle);
  }
}

if (!customElements.get('app-users-page')) {
  customElements.define('app-users-page', UsersPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-users-page': UsersPage;
  }
}
