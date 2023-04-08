import {
  randCity,
  randEmail,
  randFirstName,
  randLastName,
  randPastDate,
  randStateAbbr,
  randStreetAddress,
  randUuid,
  randZipCode,
  toCollection,
} from '@ngneat/falso';

export const customers = toCollection(
  () => {
    return {
      id: randUuid(),
      firstName: randFirstName(),
      lastName: randLastName(),
      email: randEmail(),
      streetAddress: randStreetAddress(),
      city: randCity(),
      state: randStateAbbr(),
      zipCode: randZipCode(),
      dateStarted: randPastDate({ years: 10 }),
    };
  },
  { length: 100 }
);
