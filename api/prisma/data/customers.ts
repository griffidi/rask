import {
  randCity,
  randEmail,
  randFirstName,
  randLastName,
  randPastDate,
  randStateAbbr,
  randStreetAddress,
  randZipCode,
} from '@ngneat/falso';
import { nanoid } from 'nanoid';

export const customers = Array.from({ length: 100 }, () => {
  return {
    id: nanoid(10),
    firstName: randFirstName(),
    lastName: randLastName(),
    email: randEmail(),
    streetAddress: randStreetAddress(),
    city: randCity(),
    state: randStateAbbr(),
    zipCode: randZipCode(),
    dateCreated: randPastDate({ years: 10 }),
  };
});
