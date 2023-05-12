import { GetEmployeeByIdDocument, type Employee } from ':/types/graphql.js';
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
import css from './employee-page.css' assert { type: 'css' };

export class EmployeePage extends LitElement {
  static override styles = css;

  #client = inject(Client);

  #getEmployee = new Task(
    this,
    async ([id]) => await this.#loadEmployee(id),
    () => [this.employeeId]
  );

  @property() employeeId: string | undefined;

  override render(): TemplateResult {
    return this.#renderData();
  }

  #renderData(): TemplateResult {
    return html`
      ${this.#getEmployee.render({
        pending: () => this.#renderSkeleton(),
        complete: e => this.#renderEmployee(e),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  #renderEmployee(e: Employee): TemplateResult {
    return html`
      <header>
        <h2>Edit Employee</h2>
      </header>
      <form>
        <div>
          <rk-text-field
            label="Full Name"
            .value=${e.firstName}></rk-text-field>
          <rk-text-field
            label="Full Name"
            .value=${e.lastName}></rk-text-field>
          <rk-text-field
            label="Email"
            .value=${e.email}></rk-text-field>
          <rk-text-field
            label="Phone"
            .value=${e.phone}></rk-text-field>
        </div>
        <div>
          <rk-text-field
            label="Street Address"
            .value=${e.streetAddress}></rk-text-field>
          <div class="address">
            <rk-text-field
              label="City"
              .value=${e.city}></rk-text-field>
            <rk-text-field
              label="State"
              .value=${e.state}></rk-text-field>
            <rk-text-field
              label="Postal"
              .value=${e.zipCode}></rk-text-field>
          </div>
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

  #renderSkeleton(): TemplateResult {
    return html`
      <rk-skeleton
        label
        large
        width="100px"></rk-skeleton>
    `;
  }

  async #loadEmployee(id: string) {
    try {
      const { employee } = await this.#client.query(GetEmployeeByIdDocument, {
        variables: { id },
      });

      return employee as Employee;
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded employee.' });
      throw new Error();
    }
  }
}

if (!customElements.get('app-employee-page')) {
  customElements.define('app-employee-page', EmployeePage);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employee-page': EmployeePage;
  }
}