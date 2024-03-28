import { atomWithRefresh, unwrap } from 'jotai/utils';
import { getUsers } from './user-table.api';

const usersAtom = atomWithRefresh(async () => {
  const res = await getUsers();
  return res;
});

const unwrappedUsersAtom = unwrap(usersAtom);

export { unwrappedUsersAtom };
