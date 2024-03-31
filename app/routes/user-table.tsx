import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { UserTable } from '~/components/user-table';
import {
  initSearchParamsFromDefaultUserFilter,
  getUserFilterFromSearchParams,
} from '~/components/user-table/user-table.utils';

const UserTablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(initSearchParamsFromDefaultUserFilter);
  }, [setSearchParams]);

  return (
    <div className="container mx-auto py-10">
      <UserTable userFilter={getUserFilterFromSearchParams(searchParams)} />
    </div>
  );
};

export default UserTablePage;
