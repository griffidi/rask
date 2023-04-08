import { seed } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Set a seed constant to ensure the same data is always loaded.
 *
 * https://ngneat.github.io/falso/docs/getting-started#setting-a-randomness-seed
 */
seed('some-constant-seed');

const load = async () => {
  await prisma.$connect();

  // await prisma.customer.createMany({
  //   data: {
  //     customers,
  //   },
  // });

  // await prisma.user.create({
  //   data: adminUser,
  // });

  // await prisma.user.createMany({
  //   data: basicUsers,
  // });
};

load()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
