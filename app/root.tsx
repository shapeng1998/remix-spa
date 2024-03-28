import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import type { LinksFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css?url';

import { Suspense } from 'react';
import { Provider } from 'jotai';
import { NextUIProvider } from '@nextui-org/react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <NextUIProvider>
      <Suspense fallback="Loading...">
        <Provider>
          <Outlet />
        </Provider>
      </Suspense>
    </NextUIProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];
