import { patients } from '#/fake-data/patients.js';
import { injectable } from '@rask/core/di/injectable.js';
import type { Patient } from '../models/patient.js';

@injectable()
export class PatientService {
  async getPatientById(id: string): Promise<Readonly<Patient>> {
    const patient = patients.find((u) => u.guid === id);

    return await Promise.resolve(patient);
  }

  async getPatientsPaginated(
    skip: number,
    take: number,
  ): Promise<ReadonlyArray<Readonly<Patient>>> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const page = patients.slice(skip, skip + take);

        await resolve(page);
      }, 1_000);
    });
  }
}
