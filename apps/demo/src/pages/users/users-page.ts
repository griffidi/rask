import type { User } from '#/common/models/user.js';
import { UserService } from '#/common/services/user-service.js';
// import '@material/web/dialog/dialog.js';
import { RouteTypes } from '#/router/route-types.js';
import { routerContext } from '#/router/router-context.js';
import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import css from './users-page.css' assert { type: 'css' };
// import '#/components/user-edit/user-edit.js';
import { useInject } from '@rask/core/di/inject.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import '@rask/web/button/button.js';
import '@rask/web/skeleton/skeleton.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';

const CARD_SELECTED_CLASS = 'selected';

@customElement('app-users-page')
export class UsersPage extends LitElement {
  static override styles = [css];

  // #dialogRef: Ref<MdDialog> = createRef();
  #userService = useInject(UserService);
  #getUsers = new Task(
    this,
    async ([skip, take]) => await this.#userService.getUsersPaginated(skip, take),
    () => [0, 20],
  );

  // get #dialog(): MdDialog {
  //   return this.#dialogRef.value;
  // }

  @property({ type: Boolean, reflect: true }) exiting: boolean = false;

  // @state() enteringEdit = false;
  @state() protected currentUser: User | undefined;

  @consume({ context: routerContext }) router: Router;

  // override connectedCallback(): void {
  //   super.connectedCallback();
  //   this.classList.add('scrollable');
  // }

  // protected getCardsRenderClasses(): ClassInfo {
  //   return {
  //     'one-card': false,
  //   };
  // }

  override render(): TemplateResult {
    // this.loading = true;
    // return html`${this.renderCardSkeletons()}`;
    // return html`<md-outlined-button label="test"></md-outlined-button>`;

    return html`
      ${this.#getUsers.render({
        pending: () => this.renderSkeleton(),
        complete: (users) => this.renderUsers(users),
      })}
    `;
    // ${this.renderUserEdit()}
  }

  protected renderUsers(users: ReadonlyArray<Readonly<User>>): TemplateResult {
    return html` <div class="cards">${map(users, (user) => this.renderUser(user))}</div> `;
  }

  protected renderUser(user: Readonly<User>): TemplateResult {
    return html`
      <div class="card">
        <header>
          <img src="avatar.svg" alt="Avatar" width="50px" height="50px" />
          <div class="user-name">
            <div class="title">${user.fullName}</div>
            <div class="subtitle">${user.role}</div>
          </div>
        </header>
        <section>
          <div class="contact-info">
            <label>
              <md-icon>mail</md-icon>
              ${user.email}
            </label>
            <label>
              <md-icon>phone_iphone</md-icon>
              ${user.phone}
            </label>
          </div>
        </section>
        <footer>
          <rask-button
            label="Edit"
            outlined
            @click=${(e: TypeEvent) => this.#handleEditClick(e, user)}
          ></rask-button>
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
                <rask-skeleton width="50px" height="50px" circle></rask-skeleton>
                <div class="user-name">
                  <rask-skeleton width="146px" title large></rask-skeleton>
                  <rask-skeleton width="75px" label large></rask-skeleton>
                </div>
              </header>
              <section>
                <div class="contact-info">
                  <label>
                    <rask-skeleton width="22px" body medium></rask-skeleton>
                    <rask-skeleton width="188px" body medium></rask-skeleton>
                  </label>
                  <label>
                    <rask-skeleton width="22px" body medium></rask-skeleton>
                    <rask-skeleton width="150px" body medium></rask-skeleton>
                  </label>
                </div>
              </section>
              <footer>
                <rask-skeleton width="62px" button></rask-skeleton>
              </footer>
            </div>
          `;
        })}
      </div>
    `;
  }

  // protected renderUserEdit(): TemplateResult {
  //   return html`
  //     <md-dialog ${ref(this.#dialogRef)} @closed=${this.#dialogClosed}>
  //       ${when(this.editMode, () => {
  //         return html`
  //           <app-user-edit
  //             .user=${this.currentUser}
  //             @save=${this.#handleUserEditSave}
  //             @cancel=${this.#handleUserEditCancel}
  //           ></app-user-edit>
  //         `;
  //       })}
  //     </md-dialog>
  //   `;
  // }

  // #dialogClosed(): void {
  //   this.editMode = false;
  // }

  #handleEditClick({ target }: TypeEvent, user: User): void {
    this.currentUser = user;

    // setTimeout(() => this.#dialog.show());

    const cardEl = target.closest<HTMLElement>('.card');
    // cardEl.classList.add(CARD_SELECTED_CLASS);
    cardEl.setAttribute(CARD_SELECTED_CLASS, '');

    this.exiting = true;

    const animationendHandle = () => {
      cardEl.removeEventListener('animationend', animationendHandle);
      this.router.goto(RouteTypes.userEdit.replace(/:id/, user.id));
    };

    cardEl.addEventListener('animationend', animationendHandle);
  }

  // #handleUserEditCancel(): void {
  //   this.#dialog.close();
  // }

  // async #handleUserEditSave({ user }: UserEditSaveEventDetail): Promise<void> {
  //   await this.#userService.updateUser(user);
  //   this.#dialog.close();
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-users-page': UsersPage;
  }
}
