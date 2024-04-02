import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { selectAtom } from 'jotai/utils';
import { getUsers } from './user-table.api';
import type { UserFilter } from './user-table.constants';

const userFilterAtom = atom<UserFilter | null>(null);

const loadingAtom = atom(false);

const usersDataAtom = atom<Awaited<ReturnType<typeof getUsers>> | undefined>(
  undefined,
);

const initUsersDataEffectAtom = atomEffect((get, set) => {
  const initUsersData = async () => {
    const filter = get(userFilterAtom);
    if (!filter) {
      return;
    }

    set(loadingAtom, true);

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
  filteredUsersAtom,
  initUsersDataEffectAtom,
  loadingAtom,
  totalCountAtom,
  userFilterAtom,
  usersDataAtom,
};
