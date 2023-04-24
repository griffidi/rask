import type { User } from ':/types/graphql.js';
import '@material/web/icon/icon.js';
import '@rask/web/button/button.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, type Ref } from 'lit/directives/ref.js';
import { cancelEvent, createUserEditSaveEvent } from './events.js';
import css from './user-edit.css' assert { type: 'css' };

@customElement('app-user-edit')
export class UserEdit extends LitElement {
  static override styles = css;

  #form: Ref<HTMLFormElement> = createRef();

  @property({ type: Object }) user: User | undefined;

  get valid(): boolean {
    return this.#form.value.checkValidity();
  }

  override render(): TemplateResult {
    return html`
      <form $[ref(this.#form)]>
        <header>
          <h2>Edit User</h2>
          <md-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                d="M2 17v3h8v-1.89H3.9V17c0-.64 3.13-2.1 6.1-2.1c.96.01 1.91.14 2.83.38l1.52-1.52c-1.4-.47-2.85-.73-4.35-.76c-2.67 0-8 1.33-8 4m8-13C7.79 4 6 5.79 6 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 6c-1.1 0-2-.89-2-2s.9-2 2-2s2 .9 2 2s-.89 2-2 2m11.7 3.35l-1 1l-2.05-2l1-1a.55.55 0 0 1 .77 0l1.28 1.28c.21.21.21.56 0 .77M12 18.94l6.06-6.06l2.05 2l-6 6.07H12v-2.01"
              />
            </svg>
          </md-icon>
        </header>
        <section>
          <div>
            <label>
              <input placeholder="First Name" required .value=${this.user.firstName} />
            </label>
            <label>
              <input placeholder="Last Name" required .value=${this.user.lastName} />
            </label>
            <label>
              <input placeholder="Role" required .value=${this.user.role} />
            </label>
          </div>
          <label>
            <md-icon>email</md-icon>
            <input type="email" placeholder="Email" required .value=${this.user.email} />
          </label>
        </section>
        <footer>
          <rk-button outlined label="Save" @click=${this.#handleSaveClick}></rk-button>
          <rk-button label="Cancel" @click=${this.#handleCancelClick}></rk-button>
        </footer>
      </form>
    `;
  }

  #handleSaveClick(): void {
    this.dispatchEvent(createUserEditSaveEvent(this.user));
  }

  #handleCancelClick(): void {
    this.dispatchEvent(cancelEvent);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-user-edit': UserEdit;
  }
}
