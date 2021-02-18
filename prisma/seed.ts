import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // prisma.user.create({ data: {
  //   id: 'e6fb9b54-9fd9-4ce6-8f8c-f8b6de3741ee',
  // }})
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
