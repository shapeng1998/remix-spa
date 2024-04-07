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
import { Suspense } from 'react';
import { UserTableBottom } from './user-table-bottom';
import { UserTableTop } from './user-table-top';
import { columns } from './user-table.constants';
import { filteredUsersAtom, loadingAtom } from './user-table.store';

const UserTable = () => {
  return (
    <Provider>
      <Suspense fallback="Loading...">
        <UserTableInner />
      </Suspense>
    </Provider>
  );
};

const UserTableInner = () => {
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
