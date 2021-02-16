import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: [
    { level: 'info', emit: 'stdout' },
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
  ],
});

db.$on('query', (event) => {
  console.debug(event);
});

export default db;
