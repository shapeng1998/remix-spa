import {
  Button,
  Input,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useDebouncedCallback } from '@react-hookz/web';
import { useAtom, useSetAtom } from 'jotai';
import { type FC, type TransitionStartFunction } from 'react';
import {
  defaultPage,
  userStatuses,
  type UserFilter,
  type UserStatus,
} from './user-table.constants';
import {
  nameAtom,
  pageAtom,
  statusAtom,
  updateUsersDataAtom,
} from './user-table.store';
import { setSearchParamsWithoutNavigation } from './user-table.utils';

interface UserTableTopProps {
  startTransition: TransitionStartFunction;
}

const UserTableTop: FC<UserTableTopProps> = ({ startTransition }) => {
  const updateUsersData = useSetAtom(updateUsersDataAtom);
  const [name, setName] = useAtom(nameAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const setPage = useSetAtom(pageAtom);

  const debouncedUpdateUsersDataWithTransition = useDebouncedCallback(
    (userFilter?: Partial<UserFilter>) => {
      startTransition(() => {
        updateUsersData(userFilter);
      });
    },
    [],
    300,
  );

  const handleInputValueChange = (name: string) => {
    setName(name);
    setPage(defaultPage);

    debouncedUpdateUsersDataWithTransition({ page: defaultPage, name });

    setSearchParamsWithoutNavigation((prev) => {
      if (name) {
        prev.set('name', name);
      } else {
        prev.delete('name');
      }
      prev.set('page', String(defaultPage));
      return prev;
    });
  };

  const handleSelectionChange = (keys: Selection) => {
    const status = Array.from(keys)[0] as UserStatus;

    setStatus(status);
    setPage(defaultPage);
    startTransition(() => {
      updateUsersData({ page: defaultPage, status });
    });

    setSearchParamsWithoutNavigation((prev) => {
      if (status) {
        prev.set('status', status);
      } else {
        prev.delete('status');
      }
      prev.set('page', String(defaultPage));
      return prev;
    });
  };

  const handleButtonPress = () => {
    startTransition(() => {
      updateUsersData();
    });
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

      <Button color="primary" onPress={handleButtonPress}>
        Refresh
      </Button>
    </div>
  );
};

export { UserTableTop };
