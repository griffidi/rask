import {
  randCity,
  randDepartment,
  randEmail,
  randFirstName,
  randGender,
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
      gender: randGender(),
      streetAddress: randStreetAddress(),
      city: randCity(),
      state: randStateAbbr(),
      zipCode: randZipCode(),
      jobTitle: randJobTitle(),
      department: randDepartment({ length: 4 }),
      dateStarted: randPastDate({ years: 10 }),
    };
  },
  { length: 100 }
);
