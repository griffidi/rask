import { seed } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
import { customers } from './data/customers.js';
import { departments } from './data/departments.js';
import { employees } from './data/employees.js';
import { roles } from './data/roles.js';
import { users } from './data/users.js';

const prisma = new PrismaClient();

/**
 * Set a seed constant to ensure the same data is always loaded.
 *
 * https://ngneat.github.io/falso/docs/getting-started#setting-a-randomness-seed
 */
seed('some-constant-seed');

console.log('Loading data...');

const load = async () => {
  await prisma.$connect();

  for (let i = 0, len = customers.length; i < len; i++) {
    await prisma.customer.create({
      data: customers[i],
    });
  }

  for (let i = 0, len = departments.length; i < len; i++) {
    await prisma.department.create({
      data: departments[i],
    });
  }

  for (let i = 0, len = employees.length; i < len; i++) {
    await prisma.employee.create({
      data: employees[i],
    });
  }

  for (let i = 0, len = roles.length; i < len; i++) {
    await prisma.role.create({
      data: roles[i],
    });
  }

  for (let i = 0, len = users.length; i < len; i++) {
    await prisma.user.create({
      data: users[i],
    });
  }
};

load()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
