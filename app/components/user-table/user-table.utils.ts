import { createSearchParams, type useSearchParams } from '@remix-run/react';
import {
  defaultPage,
  defaultLimit,
  type UserStatus,
  type UserFilter,
} from './user-table.constants';

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1];
type NextInit = Parameters<SetURLSearchParams>[0];

export const setSearchParamsWithoutNavigation = (nextInit?: NextInit) => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const newSearchParams = createSearchParams(
    typeof nextInit === 'function' ? nextInit(currentSearchParams) : nextInit,
  );
  const newUrl = [window.location.pathname, newSearchParams.toString()]
    .filter(Boolean)
    .join('?');
  window.history.replaceState(null, '', newUrl);
};

export const getDefaultUserFilterFromSearchParams = (
  searchParams: URLSearchParams,
): UserFilter => {
  return {
    page: Number(searchParams.get('page') ?? defaultPage),
    limit: Number(searchParams.get('limit') ?? defaultLimit),
    name: searchParams.get('name') ?? undefined,
    status: (searchParams.get('status') as UserStatus) ?? undefined,
  };
};
