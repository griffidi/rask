import {
  GetEmployeeByIdDocument,
  GetLocationStatesDocument,
  type Employee,
  type LocationState,
} from ':/types/graphql.js';
import { consume } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/textfield/outlined-text-field.js';
import { inject } from '@rask/core/di/inject.js';
import { Client } from '@rask/graphql/client/client.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { routerContext } from '../router-context.js';
import css from './employee-page.css' assert { type: 'css' };

export class EmployeePage extends LitElement {
  static override styles = css;

  #client = inject(Client);

  #getEmployee = new Task(
    this,
    async ([id]) => await this.#loadEmployee(id),
    () => [this.employeeId]
  );

  @consume({ context: routerContext }) router: Router;

  @property() employeeId: string | undefined;

  @state() locationStates: LocationState[] = [];

  constructor() {
    super();
    this.#loadLocationStates();
  }

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
      <form>
        <div>
          <fieldset>
            <label>First Name</label>
            <md-outlined-text-field
              placeholder="First Name"
              .value=${e.firstName}></md-outlined-text-field>
          </fieldset>
          <fieldset>
            <label>Last Name</label>
            <md-outlined-text-field
              placeholder="Last Name"
              .value=${e.lastName}></md-outlined-text-field>
          </fieldset>
          <fieldset>
            <label>Email</label>
            <md-outlined-text-field
              placeholder="Email"
              .value=${e.email}></md-outlined-text-field>
          </fieldset>
          <fieldset>
            <label>Phone</label>
            <md-outlined-text-field
              placeholder="Phone"
              .value=${e.phone}></md-outlined-text-field>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <label>Street Address</label>
            <md-outlined-text-field
              placeholder="Street Address"
              .value=${e.streetAddress}></md-outlined-text-field>
          </fieldset>
          <div class="address">
            <fieldset>
              <label>City</label>
              <md-outlined-text-field
                placeholder="City"
                .value=${e.city}></md-outlined-text-field>
            </fieldset>
            <!-- <fieldset>
              <label>State</label>
              <md-outlined-text-field
                placeholder="State"
                .value=${e.locationState.name}></md-outlined-text-field>
            </fieldset> -->
            <fieldset>
              <label>State</label>
              <md-outlined-select menuFixed="true">
                <md-icon slot="trailingIcon"><span>arrow</span></md-icon>
                <md-select-option headline=""></md-select-option>
                ${map(this.locationStates, state => {
                  return html`
                    <md-select-option
                      value=${state.id}
                      headline=${state.name}
                      ?selected=${state.id === e.locationState.id}></md-select-option>
                  `;
                })}
              </md-outlined-select>
            </fieldset>
            <fieldset>
              <label>Postal</label>
              <md-outlined-text-field
                placeholder="Postal"
                .value=${e.zipCode}></md-outlined-text-field>
            </fieldset>
          </div>
        </div>
      </form>
      <footer>
        <rk-button
          label="Save"
          blue
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

  async #loadLocationStates() {
    const { locationStates } = await this.#client.query(GetLocationStatesDocument);
    this.locationStates = locationStates as LocationState[];
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
