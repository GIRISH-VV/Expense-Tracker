import { useContext, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';


function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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
