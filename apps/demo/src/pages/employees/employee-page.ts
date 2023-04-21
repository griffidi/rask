import { GetEmployeeByIdDocument, type Employee } from '#/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import { Toast } from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './employee-page.css' assert { type: 'css' };

@customElement('app-employee-page')
export class EmployeePage extends LitElement {
  static override styles = css;

  #getEmployee = new Task(
    this,
    async () => await this.#loadEmployee(),
    () => [null]
  );

  @property() userId: string | undefined;

  @apolloQuery({ query: GetEmployeeByIdDocument }) private readonly query: Employee;

  override render(): TemplateResult {
    return html`
      ${this.#getEmployee.render({
        pending: () => this.renderSkeleton(),
        complete: (e) => this.renderEmployee(e),
        error: () => html`<h1>No Data</h1>`,
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
          <rk-text-field label="Full Name" .value=${e.firstName}></rk-text-field>
          <rk-text-field label="Full Name" .value=${e.lastName}></rk-text-field>
          <rk-text-field label="Email" .value=${e.email}></rk-text-field>
          <rk-text-field label="Phone" .value=${e.phone}></rk-text-field>
        </div>
        <div>
          <rk-text-field label="Street Address" .value=${e.streetAddress}></rk-text-field>
          <div class="address">
            <rk-text-field label="City" .value=${e.city}></rk-text-field>
            <rk-text-field label="State" .value=${e.state}></rk-text-field>
            <rk-text-field label="Postal" .value=${e.zipCode}></rk-text-field>
          </div>
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

  async #loadEmployee(): Promise<Employee> {
    try {
      return await this.query;
    } catch (e) {
      setTimeout(async () => await Toast.error({ title: 'Error', message: 'Failed to loaded employee.' }));
      throw new Error();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-employee-page': EmployeePage;
  }
}
