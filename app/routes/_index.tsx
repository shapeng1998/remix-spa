import type { MetaFunction } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import { UserTable } from '~/components/user-table';
import {
  getUserFilterFromSearchParams,
  initSearchParamsFromDefaultUserFilter,
} from '~/components/user-table/user-table.utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix SPA' },
    { name: 'description', content: 'Welcome to Remix (SPA Mode)!' },
  ];
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(initSearchParamsFromDefaultUserFilter);
  }, [setSearchParams]);

  return (
    <div className="container mx-auto py-10">
      <UserTable userFilter={getUserFilterFromSearchParams(searchParams)} />
    </div>
  );
}
