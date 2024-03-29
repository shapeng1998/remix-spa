export const BASE_URL = 'http://localhost:3000';

export type UserStatus = 'active' | 'paused' | 'vacation';

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
  name?: string;
  status?: UserStatus;
  page: number;
  limit: number;
}

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
