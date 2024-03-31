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
import { Provider, useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { Suspense, type FC } from 'react';
import { columns, type UserFilter } from './user-table.constants';
import {
  filteredUsersAtom,
  loadingAtom,
  userFilterAtom,
} from './user-table.store';
import { UserTableBottom } from './user-table-bottom';
import { UserTableTop } from './user-table-top';

type UserTableProps = Readonly<{
  userFilter: UserFilter;
}>;

const UserTable: FC<UserTableProps> = ({ userFilter }) => {
  return (
    <Provider>
      <Suspense fallback="Loading...">
        <UserTableInner userFilter={userFilter} />
      </Suspense>
    </Provider>
  );
};

const UserTableInner: FC<UserTableProps> = ({ userFilter }) => {
  useHydrateAtoms([[userFilterAtom, userFilter]]);

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
