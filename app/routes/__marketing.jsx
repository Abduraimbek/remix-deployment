import { Outlet } from '@remix-run/react';

import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';
import { getUserFromSession } from '~/data/auth.server';

export const links = () => [{ rel: 'stylesheet', href: marketingStyles }];

export const headers = () => ({
  'Cache-Control': 'max-age=3600', // 60 minutes
});

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export async function loader({ request }) {
  return await getUserFromSession(request);
}
