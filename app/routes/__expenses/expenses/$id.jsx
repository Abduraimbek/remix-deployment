import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export const meta = ({ params, location, data, parentsData }) => {
  const expense = parentsData['routes/__expenses/expenses'].find(
    (expense) => `${expense.id}` === params.id
  );

  return {
    title: expense.title,
    desription: 'Update expense.',
  };
};

export default function UpdateExpensePage() {
  const navigate = useNavigate();

  function onClose() {
    navigate('..');
  }

  return (
    <Modal onClose={onClose}>
      <ExpenseForm />
    </Modal>
  );
}

// export function loader({ params }) {
//   const expenseId = params.id;
//   return getExpense(expenseId);
// }

export async function action({ params, request }) {
  const expenseId = +params.id;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }

  return null;
}
