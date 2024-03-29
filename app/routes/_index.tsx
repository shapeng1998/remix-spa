import type { MetaFunction } from '@remix-run/node';
import { UserTable } from '~/components/user-table';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix SPA' },
    { name: 'description', content: 'Welcome to Remix (SPA Mode)!' },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto py-10">
      <UserTable />
    </div>
  );
}
