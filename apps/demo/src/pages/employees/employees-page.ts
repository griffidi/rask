import { routerContext } from '#/router/router-context.js';
import { GetEmployeesDocument, type Employee } from '#/types/graphql.js';
import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import { Toast } from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/table/table-cell.js';
import '@rask/web/table/table-header-cell.js';
import '@rask/web/table/table-row.js';
import '@rask/web/table/table.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './employees-page.css' assert { type: 'css' };

@customElement('app-employees-page')
export class EmployeesPage extends LitElement {
  static override styles = [css];

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
        pending: () => this.#renderSkeleton(),
        complete: (employees) => this.#renderEmployees(employees),
        error: () => html`<h1>No Data</h1>`,
      })}
    `;
  }

  #renderEmployees(employees: ReadonlyArray<Readonly<Employee>>): TemplateResult {
    return html`
      <rk-table>
        <rk-table-row header>
          <rk-table-header-cell>First Name</rk-table-header-cell>
          <rk-table-header-cell>Last Name</rk-table-header-cell>
          <rk-table-header-cell>Email</rk-table-header-cell>
          <rk-table-header-cell>Phone</rk-table-header-cell>
          <rk-table-header-cell>Job Title</rk-table-header-cell>
          <rk-table-header-cell>Start Date</rk-table-header-cell>
        </rk-table-row>
        ${this.#renderRows(employees)}
      </rk-table>
    `;
  }

  #renderRows(employees: ReadonlyArray<Readonly<Employee>>): TemplateResult {
    return html` ${map(employees, (e) => this.#renderRow(e))} `;
  }

  #renderRow(e: Employee): TemplateResult {
    return html`
      ${keyed(
        e.id,
        html`
          <rk-table-row .id=${e.id}>
            <rk-table-cell>${e.firstName}</rk-table-cell>
            <rk-table-cell>${e.lastName}</rk-table-cell>
            <rk-table-cell>${e.email}</rk-table-cell>
            <rk-table-cell>${e.phone}</rk-table-cell>
            <rk-table-cell>${e.jobTitle}</rk-table-cell>
            <rk-table-cell>${e.dateStarted}</rk-table-cell>
          </rk-table-row>
        `
      )}
    `;
  }

  #renderSkeleton(): TemplateResult {
    return html`
      <div class="table">
        ${map(range(12), () => {
          return html`hi`;
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

  // #handleEditClick({ target }: TypeEvent, employee: Employee): void {
  //   this.currentEmployee = employee;

  //   const cardEl = target.closest<HTMLElement>('.card');
  //   // cardEl.classList.add(CARD_SELECTED_CLASS);
  //   cardEl.setAttribute(CARD_SELECTED_CLASS, '');

  //   this.exiting = true;

  //   const animationendHandle = () => {
  //     cardEl.removeEventListener('animationend', animationendHandle);
  //     this.router.goto(RouteTypes.employeeEdit.replace(/:id/, employee.id));
  //   };

  //   cardEl.addEventListener('animationend', animationendHandle);
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employees-page': EmployeesPage;
  }
}