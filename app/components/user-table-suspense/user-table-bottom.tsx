import {
  Pagination,
  Select,
  SelectItem,
  type Selection,
} from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { useAtomValue } from 'jotai';
import { defaultPage, limits } from './user-table.constants';
import { totalCountAtom, userFilterAtom } from './user-table.store';

const UserTableBottom = () => {
  const [, setSearchParams] = useSearchParams();
  const totalCount = useAtomValue(totalCountAtom);
  const userFilter = useAtomValue(userFilterAtom);

  if (!totalCount || !userFilter) {
    return null;
  }

  const { page: currentPage, limit } = userFilter;

  const handlePaginationChange = (page: number) => {
    setSearchParams(
      (prev) => {
        prev.set('page', String(page));
        return prev;
      },
      { replace: true },
    );
  };

  const handleSelectionChange = (keys: Selection) => {
    const selectedLimit = Array.from(keys)[0] as string | undefined;
    if (!selectedLimit) {
      return;
    }

    setSearchParams(
      (prev) => {
        prev.set('limit', selectedLimit);
        prev.set('page', String(defaultPage));
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Pagination
        total={Math.ceil(totalCount / limit)}
        page={currentPage}
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

export { UserTableBottom };
