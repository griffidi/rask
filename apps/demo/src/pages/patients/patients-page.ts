import type { Patient } from '#/common/models/patient.js';
import { PatientService } from '#/common/services/patient-service.js';
import { Task } from '@lit-labs/task';
import '@material/web/icon/icon.js';
import { useInject } from '@rask/core/di/inject.js';
import '@rask/web/button/button.js';
import '@rask/web/skeleton/skeleton.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import css from './patients-page.css' assert { type: 'css' };

@customElement('app-patients-page')
export class PatientsPage extends LitElement {
  static override styles = [css];

  #patientervice = useInject(PatientService);
  #getPatients = new Task(
    this,
    async ([skip, take]) => await this.#patientervice.getPatientsPaginated(skip, take),
    () => [0, 20],
  );

  override connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('scrollable');
  }

  override render(): TemplateResult {
    // return html`${this.renderCardSkeletons()}`;
    // return html`<md-outlined-button label="test"></md-outlined-button>`;

    return html`
      ${this.#getPatients.render({
        pending: () => this.renderCardSkeletons(),
        complete: (patients) => this.renderPatients(patients),
      })}
    `;
  }

  protected renderPatients(patients: ReadonlyArray<Readonly<Patient>>): TemplateResult {
    return html` <div class="cards">${map(patients, (user) => this.renderPatient(user))}</div> `;
  }

  protected renderPatient(patient: Patient): TemplateResult {
    return html`
      <div class="card selectable">
        <header>
          <img src="avatar.svg" alt="Avatar" width="50px" height="50px" />
          <div class="user-name">
            <div class="title">${patient.name}</div>
          </div>
        </header>
        <section>
          <div class="contact-info">
            <label>
              <md-icon>mail</md-icon>
              ${patient.email}
            </label>
            <label>
              <md-icon>phone_iphone</md-icon>
              ${patient.phone}
            </label>
          </div>
        </section>
        <footer>
          <rask-button
            label="Edit"
            outlined
            @click=${() => this.#handleEditClick(patient)}
          ></rask-button>
        </footer>
      </div>
    `;
  }

  protected renderCardSkeletons(): TemplateResult {
    return html`
      <div class="cards">
        ${map(range(8), () => {
          return html`
            <div class="card">
              <header>
                <rask-skeleton width="50px" height="50px" circle></rask-skeleton>
                <div class="user-name">
                  <rask-skeleton width="146px" title large></rask-skeleton>
                </div>
              </header>
              <section>
                <div class="contact-info">
                  <label>
                    <rask-skeleton width="22px" body medium></rask-skeleton>
                    <rask-skeleton width="188px" body medium></rask-skeleton>
                  </label>
                  <label>
                    <rask-skeleton width="22px" body medium></rask-skeleton>
                    <rask-skeleton width="150px" body medium></rask-skeleton>
                  </label>
                </div>
              </section>
              <footer>
                <rask-skeleton width="62px" button></rask-skeleton>
              </footer>
            </div>
          `;
        })}
      </div>
    `;
  }

  #handleEditClick(patient: Patient): void {}
}

declare global {
  interface HTMLElementTagNameMap {
    'app-patients-page': PatientsPage;
  }
}
