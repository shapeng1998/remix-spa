import type { MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix SPA' },
    { name: 'description', content: 'Welcome to Remix (SPA Mode)!' },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/user-table-suspense');
  }, [navigate]);

  return null;
}
