import { useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import { UserTable } from '~/components/user-table';
import {
  defaultLimit,
  defaultPage,
} from '~/components/user-table/user-table.constants';
import { getDefaultUserFilterFromSearchParams } from '~/components/user-table/user-table.utils';

const UserTablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('page') && searchParams.has('limit')) {
      return;
    }

    setSearchParams(
      (prev) => {
        if (!prev.has('page')) {
          prev.set('page', String(defaultPage));
        }
        if (!prev.has('limit')) {
          prev.set('limit', String(defaultLimit));
        }
        return prev;
      },
      { replace: true },
    );
  }, [searchParams, setSearchParams]);

  return (
    <div className="container mx-auto py-10">
      <UserTable {...getDefaultUserFilterFromSearchParams(searchParams)} />
    </div>
  );
};

export default UserTablePage;
