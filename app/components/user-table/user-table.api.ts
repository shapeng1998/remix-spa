const BASE_URL = 'http://localhost:3000';

type UserStatus = 'active' | 'paused' | 'vacation';

interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  status: UserStatus;
  age: string;
  avatar: string;
  email: string;
}

/**
 * Get all users from api
 */
export const getUsers = async () => {
  // fetch user data
  const res = await fetch(BASE_URL + '/users');
  const users: User[] = await res.json();

  // preprocess user data
  return users.map((user) => {
    const age = user.age;
    const ageNumber = Number(age);
    return {
      ...user,
      age: Number.isFinite(ageNumber) ? ageNumber : -1,
    };
  });
};
