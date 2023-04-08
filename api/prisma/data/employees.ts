import {
  randCity,
  randEmail,
  randFirstName,
  randGender,
  randJobTitle,
  randLastName,
  randPastDate,
  randStateAbbr,
  randStreetAddress,
  randZipCode,
} from '@ngneat/falso';
import { nanoid } from 'nanoid';
import { departments } from './departments.js';

const departmentLength = departments.length;

function randDepartmentIdCustom(): string {
  const randomIndex = Math.floor(Math.random() * departmentLength);
  return departments[randomIndex].id;
}

export const employees = Array.from({ length: 100 }, () => {
  return {
    id: nanoid(10),
    firstName: randFirstName(),
    lastName: randLastName(),
    email: randEmail(),
    gender: randGender(),
    streetAddress: randStreetAddress(),
    city: randCity(),
    state: randStateAbbr(),
    zipCode: randZipCode(),
    jobTitle: randJobTitle(),
    departmentId: randDepartmentIdCustom(),
    dateStarted: randPastDate({ years: 10 }),
  };
});
