import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { Provider, useAtomValue, useSetAtom } from 'jotai';
import { Suspense, type FC, useEffect } from 'react';
import { columns, type UserFilter } from './user-table.constants';
import {
  filteredUsersAtom,
  initUsersDataEffectAtom,
  loadingAtom,
  userFilterAtom,
} from './user-table.store';
import { UserTableBottom } from './user-table-bottom';
import { UserTableTop } from './user-table-top';

type UserTableProps = Readonly<UserFilter>;

const UserTable: FC<UserTableProps> = (props) => {
  return (
    <Provider>
      <Suspense fallback="Loading...">
        <UserTableInner {...props} />
      </Suspense>
    </Provider>
  );
};

const UserTableInner: FC<UserTableProps> = ({ limit, page, name, status }) => {
  const setUserFilter = useSetAtom(userFilterAtom);

  useEffect(() => {
    setUserFilter({ limit, page, name, status });
    return () => setUserFilter(null);
  }, [limit, name, page, status, setUserFilter]);

  useAtomValue(initUsersDataEffectAtom);

  const users = useAtomValue(filteredUsersAtom);
  const loading = useAtomValue(loadingAtom);

  return (
    <Table
      aria-label="User table with some random data"
      topContent={<UserTableTop />}
      bottomContent={<UserTableBottom />}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={loading}
        loadingContent={<Spinner />}
        emptyContent={'No users found'}
        items={users ?? []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { UserTable };
