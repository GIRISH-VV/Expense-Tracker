import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../util/date";  
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ExpensesOutput/UI/LoadingOverlay";
import ErrorOverlay from "../components/ExpensesOutput/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);

  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState(null);



   useEffect(() => {
    async function getExpenses(){
      setIsFetching(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      }
      catch(error){
        setError('Could not fetch expenses!')
      }
       
       setIsFetching(false);
       
    }
    getExpenses();
   },[]);
  
  
   if(error && !isFetching){
    return <ErrorOverlay message={error} />
   }

   if(isFetching){
    return <LoadingOverlay />
   }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);

    return (expense.date >= sevenDaysAgo) && (expense.date <= today);
  });

  return (
    <ExpensesOutput expenses={recentExpenses}
     expensesPeriod="Last 7 Days" 
     fallbackText={"No expenses found for the last 7 days."}/>
  );
}

export default RecentExpenses;