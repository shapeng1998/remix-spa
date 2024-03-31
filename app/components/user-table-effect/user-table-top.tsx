import { Input, Select, SelectItem } from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { useAtom } from 'jotai';
import { type UserStatus, userStatuses } from './user-table.constants';
import { userFilterAtom, defaultPage } from './user-table.store';

const UserTableTop = () => {
  const [, setSearchParams] = useSearchParams();
  const [{ name, status }, setUserFilter] = useAtom(userFilterAtom);

  return (
    <div className="flex flex-row gap-2 *:max-w-36">
      <Input
        size="sm"
        label="Name"
        value={name ?? ''}
        onValueChange={(name) => {
          setUserFilter((prev) => ({ ...prev, name, page: defaultPage }));
          setSearchParams((prev) => {
            prev.set('page', String(defaultPage));
            if (!name) prev.delete('name');
            else prev.set('name', name);
            return prev;
          });
        }}
      />
      <Select
        size="sm"
        label="Status"
        selectionMode="single"
        selectedKeys={new Set(status ? [status] : [])}
        onSelectionChange={(keys) => {
          const selectedStatus = Array.from(keys)[0] as UserStatus | undefined;

          setUserFilter((prev) => ({
            ...prev,
            status: selectedStatus,
            page: defaultPage,
          }));
          setSearchParams((prev) => {
            prev.set('page', String(defaultPage));
            if (!selectedStatus) prev.delete('status');
            else prev.set('status', selectedStatus);
            return prev;
          });
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

export { UserTableTop };
