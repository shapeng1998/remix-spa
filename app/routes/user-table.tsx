import { useEffect, useMemo } from 'react';
import { UserTable } from '~/components/user-table';
import {
  defaultLimit,
  defaultPage,
} from '~/components/user-table/user-table.constants';
import {
  getDefaultUserFilterFromSearchParams,
  setSearchParamsWithoutNavigation,
} from '~/components/user-table/user-table.utils';

const UserTablePage = () => {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  useEffect(() => {
    if (searchParams.has('page') && searchParams.has('limit')) {
      return;
    }

    setSearchParamsWithoutNavigation((prev) => {
      if (!prev.has('page')) {
        prev.set('page', String(defaultPage));
      }
      if (!prev.has('limit')) {
        prev.set('limit', String(defaultLimit));
      }
      return prev;
    });
  }, [searchParams]);

  return (
    <div className="container mx-auto py-10">
      <UserTable {...getDefaultUserFilterFromSearchParams(searchParams)} />
    </div>
  );
};

export default UserTablePage;
