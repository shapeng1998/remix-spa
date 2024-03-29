import { users } from './db.json';
import { writeFileSync } from 'node:fs';

users.sort(() => (Math.random() > 0.5 ? 1 : -1));

writeFileSync(
  './db.json',
  JSON.stringify(
    {
      users: users.map((user) => ({
        ...user,
        id: crypto.randomUUID(),
      })),
    },
    null,
    2,
  ),
);
