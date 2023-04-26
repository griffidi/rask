import { GetEmployeeByIdDocument, type Employee } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { useInject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './employee-page.css' assert { type: 'css' };

@customElement('app-employee-page')
export class EmployeePage extends LitElement {
  static override styles = css;

  #client = useInject(Client);

  #getEmployee = new Task(
    this,
    async () => await this.#loadEmployee(),
    () => {
      const userId = location.pathname.split('/').pop();

      return [userId];
    }
  );

  @property() userId: string | undefined;

  override render(): TemplateResult {
    return html`
      ${this.#getEmployee.render({
        pending: () => this.renderSkeleton(),
        complete: e => this.renderEmployee(e),
        error: () =>
          html`
            <h1>No Data</h1>
          `,
      })}
    `;
  }

  protected renderEmployee(e: Employee): TemplateResult {
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

  protected renderSkeleton(): TemplateResult {
    return html`
      <rk-skeleton
        label
        large
        width="100px"></rk-skeleton>
    `;
  }

  async #loadEmployee(): Promise<Employee> {
    try {
      const employee = await this.#client.query<Employee>({
        query: GetEmployeeByIdDocument,
        variables: { id: this.userId },
      });
      return employee;
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded employee.' });
      throw new Error();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employee-page': EmployeePage;
  }
}
