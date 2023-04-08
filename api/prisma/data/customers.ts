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
} from '@ngneat/falso';

export const customers = Array.from({ length: 100 }, () => {
  return {
    id: randUuid(),
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
