import { atomWithRefresh, selectAtom, unwrap } from 'jotai/utils';
import { getUsers } from './user-table.api';
import { atom } from 'jotai';
import type { UserFilter } from './user-table.constants';

const defaultPage = 1;
const defaultLimit = 20;
const userFilterAtom = atom<UserFilter>({
  page: defaultPage,
  limit: defaultLimit,
});

const usersDataAtom = atomWithRefresh(async (get) => {
  const filter = get(userFilterAtom);
  const res = await getUsers(filter);
  return res;
});

// const unwrappedUsersDataAtom = unwrap(usersDataAtom, (prev) => prev);
const unwrappedUsersDataAtom = unwrap(usersDataAtom);

const totalCountAtom = selectAtom(
  unwrappedUsersDataAtom,
  (usersData) => usersData?.totalCount,
);
const filteredUsersAtom = selectAtom(
  unwrappedUsersDataAtom,
  (usersData) => usersData?.users,
);
const loadingAtom = atom((get) => get(unwrappedUsersDataAtom) === undefined);

export {
  totalCountAtom,
  filteredUsersAtom,
  userFilterAtom,
  loadingAtom,
  defaultLimit,
  defaultPage,
};
