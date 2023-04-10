import { nanoid } from 'nanoid';

export const departments = [
  {
    id: nanoid(10),
    name: 'Accounting',
    dateCreated: new Date('2021-01-01'),
    dateUpdated: new Date('2021-01-02'),
  },
  {
    id: nanoid(10),
    name: 'Engineering',
    dateCreated: new Date('2021-01-01'),
    dateUpdated: null,
  },
  {
    id: nanoid(10),
    name: 'Back Office',
    dateCreated: new Date('2021-01-01'),
    dateUpdated: new Date('2021-01-02'),
  },
  {
    id: nanoid(10),
    name: 'Sales',
    dateCreated: new Date('2022-01-01'),
    dateUpdated: new Date('2021-01-02'),
  },
  {
    id: nanoid(10),
    name: 'Marketing',
    dateCreated: new Date('2022-01-01'),
    dateUpdated: new Date('2021-01-02'),
  },
  {
    id: nanoid(10),
    name: 'Human Resources',
    dateCreated: new Date('2023-01-01'),
    dateUpdated: null,
  },
  {
    id: nanoid(10),
    name: 'Legal',
    dateCreated: new Date('2023-01-01'),
    dateUpdated: null,
  },
  {
    id: nanoid(10),
    name: 'Information Technology',
    dateCreated: new Date('2023-01-01'),
    dateUpdated: null,
  },
];
