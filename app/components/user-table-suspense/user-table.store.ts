import { atom } from 'jotai';
import { getUsers } from './user-table.api';
import {
  defaultLimit,
  defaultPage,
  type UserFilter,
  type UserStatus,
} from './user-table.constants';

export const nameAtom = atom<string | undefined>(undefined);
export const statusAtom = atom<UserStatus | undefined>(undefined);
export const pageAtom = atom(defaultPage);
export const limitAtom = atom(defaultLimit);

type Users = Awaited<ReturnType<typeof getUsers>>;

const updatedUsersDataAtom = atom<Promise<Users> | null>(null);

const usersDataAtom = atom(async (get) => {
  // get updated users data
  const updatedUsersData = get(updatedUsersDataAtom);
  if (updatedUsersData) {
    return updatedUsersData;
  }

  // get initial users data
  const searchParams = new URLSearchParams(window.location.search);
  return getUsers({
    page: Number(searchParams.get('page') ?? defaultPage),
    limit: Number(searchParams.get('limit') ?? defaultLimit),
    name: searchParams.get('name') ?? undefined,
    status: (searchParams.get('status') as UserStatus) ?? undefined,
  });
});

export const totalCountAtom = atom(async (get) => {
  const { totalCount } = await get(usersDataAtom);
  return totalCount;
});

export const filteredUsersAtom = atom(async (get) => {
  const { users } = await get(usersDataAtom);
  return users;
});

export const updateUsersDataAtom = atom(
  null,
  (get, set, userFilter?: Partial<UserFilter>) => {
    const defaultUserFilter: UserFilter = {
      page: get(pageAtom),
      limit: get(limitAtom),
      name: get(nameAtom),
      status: get(statusAtom),
    };
    const usersDataPromise = getUsers({
      ...defaultUserFilter,
      ...userFilter,
    });
    set(updatedUsersDataAtom, usersDataPromise);
  },
);
