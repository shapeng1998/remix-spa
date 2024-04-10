import {
  Pagination,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { type FC, type TransitionStartFunction } from 'react';
import { limits } from './user-table.constants';
import {
  limitAtom,
  pageAtom,
  totalCountAtom,
  updateUsersDataAtom,
} from './user-table.store';
import { setSearchParamsWithoutNavigation } from './user-table.utils';

interface UserTableBottomProps {
  startTransition: TransitionStartFunction;
}

export const UserTableBottom: FC<UserTableBottomProps> = ({
  startTransition,
}) => {
  const totalCount = useAtomValue(totalCountAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const updateUsersData = useSetAtom(updateUsersDataAtom);

  if (!totalCount) {
    return null;
  }

  const handlePaginationChange = (page: number) => {
    setPage(page);
    startTransition(() => {
      updateUsersData({ page });
    });

    setSearchParamsWithoutNavigation((prev) => {
      prev.set('page', String(page));
      return prev;
    });
  };

  const handleSelectionChange = (keys: Selection) => {
    const limit = Number(Array.from(keys)[0]);

    setLimit(limit);
    startTransition(() => {
      updateUsersData({ limit });
    });

    setSearchParamsWithoutNavigation((prev) => {
      prev.set('limit', String(limit));
      return prev;
    });
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Pagination
        total={Math.ceil(totalCount / limit)}
        page={page}
        onChange={handlePaginationChange}
      />
      <Select
        size="sm"
        label="Limit"
        labelPlacement="outside-left"
        className="flex max-w-32 flex-row items-center"
        selectionMode="single"
        selectedKeys={new Set([String(limit)])}
        onSelectionChange={handleSelectionChange}
      >
        {limits.map((limit) => (
          <SelectItem key={limit} value={limit} textValue={String(limit)}>
            {limit}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
