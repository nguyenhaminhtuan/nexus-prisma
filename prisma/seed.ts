import { PrismaClient } from '@prisma/client';
import { users } from './seeders/users';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data: users, skipDuplicates: true });
  await prisma.profile.createMany({
    data: users.map((user) => ({
      userId: user.id,
    })),
    skipDuplicates: true,
  });
  await prisma.post.createMany({
    data: Array(10000)
      .fill(1)
      .map(() => ({
        content: 'haha',
        isPublished: true,
        userId: 'a5a8d0bf-8c49-4b48-b670-2bab5d4cc405',
      })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
