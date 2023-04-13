import { RouteTypes } from '#/router/route-types.js';
import { routerContext } from '#/router/router-context.js';
import { GetEmployeesDocument, type Employee } from '#/types/graphql.js';
import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import type { TypeEvent } from '@rask/core/events/type-event.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import resetCss from '@rask/web/css/reset-component.js';
import { Toast } from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './employees-page.css' assert { type: 'css' };

const CARD_SELECTED_CLASS = 'selected';

@customElement('app-employees-page')
export class EmployeesPage extends LitElement {
  static override styles = [resetCss, css];

  #getEmployees = new Task(
    this,
    async () => await this.#loadEmployees(),
    () => [null]
  );

  @property({ type: Boolean, reflect: true }) exiting: boolean = false;
  @state() protected currentEmployee: Employee | undefined;

  @apolloQuery({ query: GetEmployeesDocument }) private readonly query: Employee[];
  @consume({ context: routerContext }) router: Router;

  override render(): TemplateResult {
    return html`
      ${this.#getEmployees.render({
        pending: () => this.renderSkeleton(),
        complete: (employees) => this.renderEmployees(employees),
        error: () => html`<h1>No Data</h1>`,
      })}
    `;
  }

  protected renderEmployees(employees: ReadonlyArray<Readonly<Employee>>): TemplateResult {
    return html` <div class="cards">${map(employees, (employee) => this.renderEmployee(employee))}</div> `;
  }

  protected renderEmployee(employee: Readonly<Employee>): TemplateResult {
    return html`
      <div class="card">
        <header>
          <!-- <img src="avatar.svg" alt="Avatar" width="50px" height="50px" /> -->
          <md-icon class="avatar">person</md-icon>
          <div class="employee-name">
            <div class="title">${employee.firstName} ${employee.lastName}</div>
            <div class="subtitle">${employee.jobTitle}</div>
          </div>
        </header>
        <section>
          <div class="contact-info">
            <label>
              <md-icon>mail</md-icon>
              ${employee.email}
            </label>
            <label>
              <md-icon>mail</md-icon>
              ${employee.phone}
            </label>
          </div>
        </section>
        <footer>
          <rk-button label="Edit" outlined @click=${(e: TypeEvent) => this.#handleEditClick(e, employee)}></rk-button>
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
                <rk-skeleton width="50px" height="50px" circle></rk-skeleton>
                <div class="employee-name">
                  <rk-skeleton width="146px" title large></rk-skeleton>
                  <rk-skeleton width="75px" label large></rk-skeleton>
                </div>
              </header>
              <section>
                <div class="contact-info">
                  <label>
                    <rk-skeleton width="22px" body medium></rk-skeleton>
                    <rk-skeleton width="188px" body medium></rk-skeleton>
                  </label>
                  <label>
                    <rk-skeleton width="22px" body medium></rk-skeleton>
                    <rk-skeleton width="150px" body medium></rk-skeleton>
                  </label>
                </div>
              </section>
              <footer>
                <rk-skeleton width="62px" button></rk-skeleton>
              </footer>
            </div>
          `;
        })}
      </div>
    `;
  }

  async #loadEmployees(): Promise<Employee[]> {
    try {
      return await this.query;
    } catch (e) {
      setTimeout(async () => await Toast.error({ title: 'Error', message: 'Failed to loaded employees.' }));
      throw new Error();
    }
  }

  #handleEditClick({ target }: TypeEvent, employee: Employee): void {
    this.currentEmployee = employee;

    const cardEl = target.closest<HTMLElement>('.card');
    // cardEl.classList.add(CARD_SELECTED_CLASS);
    cardEl.setAttribute(CARD_SELECTED_CLASS, '');

    this.exiting = true;

    const animationendHandle = () => {
      cardEl.removeEventListener('animationend', animationendHandle);
      this.router.goto(RouteTypes.employeeEdit.replace(/:id/, employee.id));
    };

    cardEl.addEventListener('animationend', animationendHandle);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employees-page': EmployeesPage;
  }
}
