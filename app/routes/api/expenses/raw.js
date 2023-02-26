import { json } from '@remix-run/node';

import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  return json(
    {
      expenses: expenses,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
