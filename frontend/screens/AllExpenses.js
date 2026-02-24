import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchMonthlyExpenses } from '../util/api';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ExpensesOutput/UI/LoadingOverlay';
import ErrorOverlay from '../components/ExpensesOutput/UI/ErrorOverlay';


function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMonthlyData() {
      setIsFetching(true);
      setError(null);
      try {
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        const expenses = await fetchMonthlyExpenses(authCtx.token, month, year);
        expensesCtx.setExpenses(expenses);
      } catch (err) {
        setError('Could not fetch monthly expenses!');
      }
      setIsFetching(false);
    }

    getMonthlyData();
  }, [authCtx.token, selectedMonth]);

  function changeMonthHandler(monthOffset) {
    setSelectedMonth((currentMonth) => {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    });
  }

  const filteredExpenses = expensesCtx.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth.getMonth() &&
      expenseDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const selectedMonthLabel = selectedMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput expenses={filteredExpenses} 
    expensesPeriod="Total"
    monthLabel={selectedMonthLabel}
    onPrevMonth={changeMonthHandler.bind(this, -1)}
    onNextMonth={changeMonthHandler.bind(this, 1)}
     fallbackText={"No expenses found for this month."}/>
  );
  
}

export default AllExpenses;
