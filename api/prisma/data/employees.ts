import {
  randCity,
  randDepartment,
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randPastDate,
  randStateAbbr,
  randStreetAddress,
  randUuid,
  randZipCode,
  toCollection,
} from '@ngneat/falso';

export const employees = toCollection(
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
      jobTitle: randJobTitle(),
      department: randDepartment({ length: 4 }),
      startDate: randPastDate(),
    };
  },
  { length: 100 }
);
