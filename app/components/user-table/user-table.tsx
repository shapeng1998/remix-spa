import {
  Link,
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
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

type UserTableProps = Readonly<UserFilter>;

export const UserTable: FC<UserTableProps> = (props) => {
  return (
    <Provider>
      <ErrorBoundary FallbackComponent={UserTableErrorFallback}>
        <Suspense fallback={<Spinner />}>
          <UserTableInner {...props} />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  );
};

const UserTableErrorFallback: FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert" className="rounded bg-warning-50 p-3">
      <p>
        There was an error in loading the user table.{' '}
        <Link color="danger" underline="always" href="/">
          Reload this page.
        </Link>
      </p>
      <p className="text-danger-500">{error?.message}</p>
    </div>
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
