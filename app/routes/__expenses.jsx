import { Outlet } from '@remix-run/react';

import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import expensesStyles from '~/styles/expenses.css';

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];

export default function ExpensesLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />;
    </>
  );
}
