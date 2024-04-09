import invariant from 'tiny-invariant';
import { BASE_URL, type User, type UserFilter } from './user-table.constants';

/**
 * Get all users from api
 */
export const getUsers = async ({
  name,
  status,
  limit,
  page,
}: Partial<UserFilter>) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('_page', String(page));
  }
  if (limit) {
    searchParams.set('_limit', String(limit));
  }
  if (name) {
    searchParams.set('name_like', name);
  }
  if (status) {
    searchParams.set('status', status);
  }

  const res = await fetch(BASE_URL + '/users?' + searchParams.toString());

  const totalCount = res.headers.get('X-Total-Count');
  invariant(
    typeof totalCount === 'string',
    'Expected totalCount to be a string',
  );

  const rawUsers: User[] = await res.json();
  const users = rawUsers.map((user) => ({ ...user, age: Number(user.age) }));

  return {
    users,
    totalCount: Number(totalCount),
  };
};
