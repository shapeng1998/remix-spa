import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { columns, userStatuses, type UserStatus } from './user-table.constants';
import {
  defaultPage,
  filteredUsersAtom,
  loadingAtom,
  totalCountAtom,
  userFilterAtom,
} from './user-table.store';

// TODO: search based on location search string
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
  const [{ name, status }, setUserFilter] = useAtom(userFilterAtom);

  return (
    <div className="flex flex-row gap-2 *:max-w-xs">
      <Input
        size="sm"
        label="Name"
        value={name}
        onValueChange={(name) =>
          setUserFilter((prev) => ({ ...prev, name, page: defaultPage }))
        }
      />
      <Select
        size="sm"
        label="Status"
        selectionMode="single"
        selectedKeys={new Set([status as string])}
        onSelectionChange={(keys) => {
          const selectedStatus = Array.from(keys)[0] as UserStatus;
          setUserFilter((prev) => ({
            ...prev,
            status: selectedStatus,
            page: defaultPage,
          }));
        }}
      >
        {userStatuses.map((userStatus) => (
          <SelectItem key={userStatus} value={userStatus}>
            {userStatus}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
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
