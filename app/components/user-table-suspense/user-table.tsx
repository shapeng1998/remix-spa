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
import { Suspense, useTransition } from 'react';
import { UserTableBottom } from './user-table-bottom';
import { UserTableTop } from './user-table-top';
import { columns } from './user-table.constants';
import { filteredUsersAtom } from './user-table.store';

const UserTable = () => {
  return (
    <Provider>
      <Suspense fallback={<Spinner />}>
        <UserTableInner />
      </Suspense>
    </Provider>
  );
};

const UserTableInner = () => {
  const users = useAtomValue(filteredUsersAtom);
  const [isPending, startTransition] = useTransition();

  return (
    <Table
      aria-label="User table with some random data"
      topContent={<UserTableTop startTransition={startTransition} />}
      bottomContent={<UserTableBottom startTransition={startTransition} />}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={users}
        isLoading={isPending}
        loadingContent={<Spinner />}
        emptyContent="No users found."
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
