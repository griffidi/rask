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
      startDate: randPastDate(),
    };
  },
  { length: 100 }
);
