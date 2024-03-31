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
    setSearchParams((prev) => {
      if (!prev.get('page')) {
        prev.set('page', String(defaultPage));
      }
      if (!prev.get('limit')) {
        prev.set('limit', String(defaultLimit));
      }
      return prev;
    });
  }, [setSearchParams]);

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
