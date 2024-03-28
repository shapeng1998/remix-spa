import { useAtomValue } from 'jotai';
import { unwrappedUsersAtom } from './user-table.store';

export const UserTable = () => {
  const users = useAtomValue(unwrappedUsersAtom);

  return <>{JSON.stringify(users)}</>;
};
