import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { selectAtom } from 'jotai/utils';
import { getUsers } from './user-table.api';
import type { UserFilter } from './user-table.constants';

const defaultPage = 1;
const defaultLimit = 10;
const defaultUserFilter: UserFilter = {
  page: defaultPage,
  limit: defaultLimit,
};
const userFilterAtom = atom<UserFilter>(defaultUserFilter);

const loadingAtom = atom(false);

const usersDataAtom = atom<Awaited<ReturnType<typeof getUsers>> | undefined>(
  undefined,
);

const initUsersDataEffectAtom = atomEffect((get, set) => {
  const initUsersData = async () => {
    set(loadingAtom, true);

    const filter = get(userFilterAtom);
    const res = await getUsers(filter);

    set(loadingAtom, false);
    set(usersDataAtom, res);
  };

  initUsersData();
});

const totalCountAtom = selectAtom(
  usersDataAtom,
  (usersData) => usersData?.totalCount,
);

const filteredUsersAtom = selectAtom(
  usersDataAtom,
  (usersData) => usersData?.users,
);

export {
  defaultLimit,
  defaultPage,
  defaultUserFilter,
  filteredUsersAtom,
  initUsersDataEffectAtom,
  loadingAtom,
  totalCountAtom,
  userFilterAtom,
};
