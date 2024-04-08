import {
  Button,
  Input,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useSetAtom } from 'jotai';
import { type FC, type TransitionStartFunction } from 'react';
import {
  defaultPage,
  userStatuses,
  type UserStatus,
} from './user-table.constants';
import { nameAtom, statusAtom, updateUsersDataAtom } from './user-table.store';

interface UserTableTopProps {
  startTransition: TransitionStartFunction;
}

const UserTableTop: FC<UserTableTopProps> = ({ startTransition }) => {
  const updateUsersData = useSetAtom(updateUsersDataAtom);
  const setName = useSetAtom(nameAtom);
  const setStatus = useSetAtom(statusAtom);

  const handleInputValueChange = (name: string) => {
    setName(name);
    startTransition(() => {
      updateUsersData({ page: defaultPage, name });
    });
  };

  const handleSelectionChange = (keys: Selection) => {
    const status = Array.from(keys)[0] as UserStatus;
    setStatus(status);
    startTransition(() => {
      updateUsersData({ page: defaultPage, status });
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
        <Input size="sm" label="Name" onValueChange={handleInputValueChange} />
        <Select
          size="sm"
          label="Status"
          selectionMode="single"
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
