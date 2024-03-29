import { useAtom, useAtomValue } from 'jotai';
import {
  filteredUsersAtom,
  loadingAtom,
  totalCountAtom,
  userFilterAtom,
} from './user-table.store';
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { columns } from './user-table.constants';

const UserTable = () => {
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

const UserTableTop = () => {
  return <></>;
};

const UserTableBottom = () => {
  const [{ page: currentPage, limit }, setUserFilter] = useAtom(userFilterAtom);

  const totalCount = useAtomValue(totalCountAtom);
  if (!totalCount) {
    return null;
  }

  const totalPage = Math.ceil(totalCount / limit);
  if (totalPage === 1) {
    return null;
  }

  return (
    <Pagination
      total={Math.ceil(totalCount / limit)}
      page={currentPage}
      onChange={(page) => setUserFilter((prev) => ({ ...prev, page }))}
    />
  );
};

export { UserTable };
