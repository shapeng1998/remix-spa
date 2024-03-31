import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { UserTable } from '~/components/user-table';
import {
  defaultPage,
  defaultLimit,
} from '~/components/user-table/user-table.store';
import type { UserStatus } from '~/components/user-table/user-table.constants';

const UserTablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('page') && searchParams.has('limit')) {
      return;
    }

    setSearchParams((prev) => {
      if (!prev.has('page')) {
        prev.set('page', String(defaultPage));
      }
      if (!prev.has('limit')) {
        prev.set('limit', String(defaultLimit));
      }
      return prev;
    });
  }, [searchParams, setSearchParams]);

  return (
    <div className="container mx-auto py-10">
      <UserTable
        userFilter={{
          limit: Number(searchParams.get('limit') ?? defaultLimit),
          page: Number(searchParams.get('page') ?? defaultPage),
          name: searchParams.get('name') ?? undefined,
          status: (searchParams.get('status') as UserStatus) ?? undefined,
        }}
      />
    </div>
  );
};

export default UserTablePage;
