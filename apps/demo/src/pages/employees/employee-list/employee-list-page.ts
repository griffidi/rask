import { GetEmployeesDocument, type Employee } from ':/types/graphql.js';
import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import { DateTime } from '@rask/core/common/i18n/date-time.js';
import { inject } from '@rask/core/di/inject.js';
import { delay } from '@rask/core/reactivity/timer/delay.js';
import { Timer } from '@rask/core/reactivity/timer/timer.js';
import { Client } from '@rask/graphql/client/client.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton-table.js';
import type { TableRowEditEvent, TableRowSelectedEvent } from '@rask/web/table/events.js';
import '@rask/web/table/table-cell.js';
import '@rask/web/table/table-header-cell.js';
import '@rask/web/table/table-row.js';
import '@rask/web/table/table.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { routerContext } from '../../../router/router-context.js';
import css from './employee-list-page.css' assert { type: 'css' };

export class EmployeeListPage extends LitElement {
  static override styles = css;

  #client = inject(Client);

  /**
   * Task to load employees.
   */
  #task = new Task(
    this,
    async () => await this.#loadEmployees(),
    () => [null]
  );

  /**
   * Employees router context.
   */
  @consume({ context: routerContext }) router: Router;

  @property({ type: Boolean, reflect: true }) exiting: boolean = false;

  override render(): TemplateResult {
    return html`
      ${this.#task.render({
        pending: () => this.#renderSkeleton(),
        complete: employees => this.#renderEmployees(employees),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  #renderEmployees(employees: ReadonlyArray<Readonly<Employee>>): TemplateResult {
    return html`
      <rk-table
        selectable
        @row-selected=${this.#handleTableRowSelected}
        @row-edit=${this.#handleTableRowEdit}>
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
    return html`
      ${map(employees, e => this.#renderRow(e))}
    `;
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
            <rk-table-cell edit></rk-table-cell>
          </rk-table-row>
        `
      )}
    `;
  }

  #renderSkeleton(): TemplateResult {
    return html`
      <rk-skeleton-table
        rows="20"
        columns="7"></rk-skeleton-table>
    `;
  }

  async #loadEmployees() {
    try {
      const timer = Timer.start();
      const { employees } = await this.#client.query(GetEmployeesDocument);

      await delay(2000 - timer.stop());

      return employees as Employee[];
    } catch {
      toast.error({ title: 'Error', message: 'Failed to loaded employees.' });
      throw new Error();
    }
  }

  async #handleTableRowSelected({ detail: { row } }: TableRowSelectedEvent) {
    const { id } = row;
    await this.router.goto(`/employees/${id}`);
    // location.assign(`/employees/${id}`);
  }

  #handleTableRowEdit({ detail: { row } }: TableRowEditEvent): void {
    const { id } = row;
    this.router.goto(`/employees/${id}/edit`);
  }
}

if (!customElements.get('app-employee-list-page')) {
  customElements.define('app-employee-list-page', EmployeeListPage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employee-list-page': EmployeeListPage;
  }
}
