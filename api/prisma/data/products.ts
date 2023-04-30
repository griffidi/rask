import { randPastDate } from '@ngneat/falso';
import { nanoid } from 'nanoid';
import { randChanceFn } from './generators/chance-fn.js';

export const TSHIRT_NAME = 'T-Shirt';
export const PANTS_NAME = 'Pants';
export const SHORTS_NAME = 'Shorts';
export const SWEATER_NAME = 'Sweater';
export const HAT_NAME = 'Hat';
export const HOODIE_NAME = 'Hoodie';

export const products = [
  {
    id: nanoid(10),
    name: TSHIRT_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
  {
    id: nanoid(10),
    name: PANTS_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
  {
    id: nanoid(10),
    name: SHORTS_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
  {
    id: nanoid(10),
    name: SWEATER_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
  {
    id: nanoid(10),
    name: HAT_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
  {
    id: nanoid(10),
    name: HOODIE_NAME,
    dateCreated: randPastDate({ years: 10 }),
    dateUpdated: randChanceFn({ chanceTrue: 0.4 }, () => randPastDate({ years: 10 })),
  },
];
