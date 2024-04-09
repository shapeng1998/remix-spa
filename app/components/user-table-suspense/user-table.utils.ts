import { createSearchParams, type useSearchParams } from '@remix-run/react';

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1];

export const setSearchParamsWithoutNavigation: SetURLSearchParams = (
  nextInit,
) => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const newSearchParams = createSearchParams(
    typeof nextInit === 'function' ? nextInit(currentSearchParams) : nextInit,
  );
  const newUrl = [window.location.pathname, newSearchParams.toString()]
    .filter(Boolean)
    .join('?');
  window.history.replaceState(null, '', newUrl);
};
