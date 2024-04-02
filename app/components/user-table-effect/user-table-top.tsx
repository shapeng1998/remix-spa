import {
  Button,
  Input,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  type UserStatus,
  userStatuses,
  defaultPage,
} from './user-table.constants';
import { userFilterAtom, usersDataAtom, loadingAtom } from './user-table.store';
import { getUsers } from './user-table.api';

const UserTableTop = () => {
  const [, setSearchParams] = useSearchParams();
  const userFilter = useAtomValue(userFilterAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const setUsersData = useSetAtom(usersDataAtom);

  if (!userFilter) {
    return null;
  }

  const { name, status } = userFilter;

  const handleInputValueChange = (name: string) => {
    setSearchParams(
      (prev) => {
        prev.set('page', String(defaultPage));
        if (!name) prev.delete('name');
        else prev.set('name', name);
        return prev;
      },
      { replace: true },
    );
  };

  const handleSelectionChange = (keys: Selection) => {
    const selectedStatus = Array.from(keys)[0] as UserStatus | undefined;
    setSearchParams(
      (prev) => {
        prev.set('page', String(defaultPage));
        if (!selectedStatus) prev.delete('status');
        else prev.set('status', selectedStatus);
        return prev;
      },
      { replace: true },
    );
  };

  const handleButtonPress = async () => {
    setLoading(true);
    const res = await getUsers(userFilter);
    setLoading(false);
    setUsersData(res);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
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

      <Button color="primary" isLoading={loading} onPress={handleButtonPress}>
        Refresh
      </Button>
    </div>
  );
};

export { UserTableTop };
