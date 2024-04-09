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
import { Suspense, useTransition, type FC } from 'react';
import { UserTableBottom } from './user-table-bottom';
import { UserTableTop } from './user-table-top';
import { columns, type UserFilter } from './user-table.constants';
import {
  filteredUsersAtom,
  limitAtom,
  nameAtom,
  pageAtom,
  statusAtom,
} from './user-table.store';
import { useHydrateAtoms } from 'jotai/utils';

type UserTableProps = Readonly<UserFilter>;

const UserTable: FC<UserTableProps> = (props) => {
  return (
    <Provider>
      <Suspense fallback={<Spinner />}>
        <UserTableInner {...props} />
      </Suspense>
    </Provider>
  );
};

const UserTableInner: FC<UserTableProps> = ({ limit, name, page, status }) => {
  useHydrateAtoms([
    [limitAtom, limit],
    [nameAtom, name],
    [pageAtom, page],
    [statusAtom, status],
  ]);

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
