import { routerContext } from '#/router/router-context.js';
import { GetEmployeesDocument, type Employee } from '#/types/graphql.js';
import { consume } from '@lit-labs/context';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import { DateTime } from '@rask/core/common/i18n/date-time.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import { Toast } from '@rask/web/notifications/toast.js';
import { scrollable } from '@rask/web/scrollable/scrollable.js';
import '@rask/web/skeleton/skeleton.js';
import type { TableRowSelectedEvent } from '@rask/web/table/events.js';
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

  #employees: ReadonlyArray<Readonly<Employee>> | undefined;

  #getEmployees = new Task(
    this,
    async () => await this.#loadEmployees(),
    () => [null]
  );

  @property({ type: Boolean, reflect: true }) exiting: boolean = false;
  @state() private currentEmployee: Employee | undefined;

  @apolloQuery({ query: GetEmployeesDocument }) private readonly query: Employee[];
  @consume({ context: routerContext }) router: Router;

  override render(): TemplateResult {
    return html`
      <div ${scrollable()}>
        <header>
          <span class="title">Employees</span>
          <rk-button outlined>Add Employee</rk-button>
        </header>
        ${this.#getEmployees.render({
          pending: () => this.#renderSkeleton(),
          complete: (employees) => this.#renderEmployees(employees),
          error: () => html`<h1>No Data</h1>`,
        })}
      </div>
    `;
  }

  #renderEmployees(employees: ReadonlyArray<Readonly<Employee>>): TemplateResult {
    this.#employees = employees;

    return html`
      <rk-table selectable @row-selected=${this.#handleTableRowSelected}>
        <rk-table-row header>
          <rk-table-header-cell>First Name</rk-table-header-cell>
          <rk-table-header-cell>Last Name</rk-table-header-cell>
          <rk-table-header-cell>Email</rk-table-header-cell>
          <rk-table-header-cell>Phone</rk-table-header-cell>
          <rk-table-header-cell>Job Title</rk-table-header-cell>
          <rk-table-header-cell>Start Date</rk-table-header-cell>
          <rk-table-header-cell edit></rk-table-header-cell>
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
            <rk-table-cell>${DateTime.toISODate(e.dateStarted)}</rk-table-cell>
            <rk-table-cell edit> </rk-table-cell>
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

  #handleTableRowSelected({ detail: { row } }: TableRowSelectedEvent): void {
    const { id } = row;
    const employee = this.#employees.find((e) => e.id === id);

    if (employee) {
      this.currentEmployee = employee;
      console.dir(employee);
    }
  }

  #handleEditClick(): void {
    const employee = this.currentEmployee;
    // this.currentEmployee = employee;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employees-page': EmployeesPage;
  }
}
