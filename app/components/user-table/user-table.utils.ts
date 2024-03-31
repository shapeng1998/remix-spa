import type { UserStatus } from './user-table.constants';
import {
  defaultLimit,
  defaultPage,
  defaultUserFilter,
} from './user-table.store';

export const getUserFilterFromSearchParams = (
  searchParams: URLSearchParams,
) => {
  const userFilter = defaultUserFilter;

  const limitParam = searchParams.get('limit');
  if (limitParam) {
    userFilter.limit = Number(limitParam);
  }

  const pageParam = searchParams.get('page');
  if (pageParam) {
    userFilter.page = Number(pageParam);
  }

  const nameParam = searchParams.get('name');
  if (nameParam) {
    userFilter.name = nameParam;
  }

  const statusParam = searchParams.get('status');
  if (statusParam) {
    userFilter.status = statusParam as UserStatus;
  }

  return userFilter;
};

export const initSearchParamsFromDefaultUserFilter = (
  prev: URLSearchParams,
) => {
  if (!prev.get('page')) {
    prev.set('page', String(defaultPage));
  }

  if (!prev.get('limit')) {
    prev.set('limit', String(defaultLimit));
  }

  return prev;
};
