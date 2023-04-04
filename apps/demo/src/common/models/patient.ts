export interface Patient {
  guid: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  postalZip: string;
  country: string;
}

export const patientKeys: ReadonlyArray<keyof Patient> = [
  'guid',
  'name',
  'phone',
  'email',
  'address',
  'postalZip',
  'country',
];
