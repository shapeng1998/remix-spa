export const BASE_URL = 'http://localhost:3000';

export const defaultPage = 1;
export const defaultLimit = 10;

export const userStatuses = ['active', 'paused', 'vacation'] as const;

export type UserStatus = (typeof userStatuses)[number];

export type UserColumn = {
  [K in keyof User]: {
    key: K;
    label: Uppercase<K>;
  };
}[keyof User];

export interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  status: UserStatus;
  age: string;
  avatar: string;
  email: string;
}

export interface UserFilter {
  name: string | undefined;
  status: UserStatus | undefined;
  page: number;
  limit: number;
}

export const limits = [10, 20, 30, 60];

export const columns: UserColumn[] = [
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'age',
    label: 'AGE',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },
  {
    key: 'role',
    label: 'ROLE',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];
