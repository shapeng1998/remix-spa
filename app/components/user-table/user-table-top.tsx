import {
  Button,
  Input,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { type UserStatus, userStatuses } from './user-table.constants';
import {
  userFilterAtom,
  defaultPage,
  usersDataAtom,
  loadingAtom,
} from './user-table.store';

const UserTableTop = () => {
  const [, setSearchParams] = useSearchParams();
  const [{ name, status }, setUserFilter] = useAtom(userFilterAtom);
  const refreshUsersData = useSetAtom(usersDataAtom);
  const loading = useAtomValue(loadingAtom);

  const handleInputValueChange = (name: string) => {
    setUserFilter((prev) => ({ ...prev, name, page: defaultPage }));
    setSearchParams((prev) => {
      prev.set('page', String(defaultPage));
      if (!name) prev.delete('name');
      else prev.set('name', name);
      return prev;
    });
  };

  const handleSelectionChange = (keys: Selection) => {
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
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2 *:max-w-36">
        <Input
          size="sm"
          label="Name"
          value={name ?? ''}
          onValueChange={handleInputValueChange}
        />
        <Select
          size="sm"
          label="Status"
          selectionMode="single"
          selectedKeys={new Set(status ? [status] : [])}
          onSelectionChange={handleSelectionChange}
        >
          {userStatuses.map((userStatus) => (
            <SelectItem key={userStatus} value={userStatus}>
              {userStatus}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Button
        color="primary"
        isLoading={loading}
        onPress={() => refreshUsersData()}
      >
        Refresh
      </Button>
    </div>
  );
};

export { UserTableTop };
