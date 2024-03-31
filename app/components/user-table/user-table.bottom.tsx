import { Pagination, Select, SelectItem } from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { useAtomValue, useAtom } from 'jotai';
import { limits } from './user-table.constants';
import {
  totalCountAtom,
  userFilterAtom,
  defaultPage,
} from './user-table.store';

const UserTableBottom = () => {
  const [, setSearchParams] = useSearchParams();
  const totalCount = useAtomValue(totalCountAtom);
  const [{ page: currentPage, limit }, setUserFilter] = useAtom(userFilterAtom);

  if (!totalCount) {
    return null;
  }

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Pagination
        total={Math.ceil(totalCount / limit)}
        page={currentPage}
        onChange={(page) => {
          setUserFilter((prev) => ({ ...prev, page }));
          setSearchParams((prev) => {
            prev.set('page', String(page));
            return prev;
          });
        }}
      />
      <Select
        size="sm"
        label="Limit"
        labelPlacement="outside-left"
        className="flex max-w-32 flex-row items-center"
        selectionMode="single"
        selectedKeys={new Set([String(limit)])}
        onSelectionChange={(keys) => {
          const selectedLimit = Array.from(keys)[0] as string | undefined;
          if (!selectedLimit) {
            return;
          }

          setUserFilter((prev) => ({
            ...prev,
            limit: Number(selectedLimit),
            page: defaultPage,
          }));
          setSearchParams((prev) => {
            prev.set('limit', selectedLimit);
            return prev;
          });
        }}
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
