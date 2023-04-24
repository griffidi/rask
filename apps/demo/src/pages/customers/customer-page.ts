import { GetCustomerByIdDocument, type Customer } from ':/types/graphql.js';
import { Task } from '@lit-labs/task';
import '@material/web/textfield/outlined-text-field.js';
import { apolloQuery } from '@rask/graphql/decorators/apollo-query.js';
import '@rask/web/button/button.js';
import toast from '@rask/web/notifications/toast.js';
import '@rask/web/skeleton/skeleton.js';
import '@rask/web/text-field/text-field.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import css from './customer-page.css' assert { type: 'css' };

@customElement('app-customer-page')
export class CustomerPage extends LitElement {
  static override styles = css;

  #getCustomer = new Task(
    this,
    async () => await this.#loadCustomer(),
    () => [null]
  );

  @property() userId: string | undefined;

  @apolloQuery({ query: GetCustomerByIdDocument }) private readonly query: Customer;

  override render(): TemplateResult {
    return html`
      ${this.#getCustomer.render({
        pending: () => this.renderSkeleton(),
        complete: (e) => this.renderCustomer(e),
        error: () => html`<h1>No Data</h1>`,
      })}
    `;
  }

  protected renderCustomer(e: Customer): TemplateResult {
    return html`
      <header>
        <h2>Edit Customer</h2>
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

  async #loadCustomer(): Promise<Customer> {
    try {
      return await this.query;
    } catch (e) {
      toast.error({ title: 'Error', message: 'Failed to loaded customer.' });
      throw new Error();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-customer-page': CustomerPage;
  }
}
