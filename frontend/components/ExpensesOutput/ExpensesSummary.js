import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName, monthLabel, onPrevMonth, onNextMonth }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  const showMonthFilter = !!monthLabel && !!onPrevMonth && !!onNextMonth;

    return (
        <View style={styles.container}>  
            <View style={styles.summaryRow}>
              <Text style={styles.period}>{periodName}</Text>
              <Text style={styles.sum}>₹{expensesSum.toFixed(2)}</Text>
            </View>
            {showMonthFilter && (
              <View style={styles.filterRow}>
                <Pressable
                  onPress={onPrevMonth}
                  style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
                >
                  <Text style={styles.arrowText}>{'<'}</Text>
                </Pressable>
                <Text style={styles.monthText}>{monthLabel}</Text>
                <Pressable
                  onPress={onNextMonth}
                  style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
                >
                  <Text style={styles.arrowText}>{'>'}</Text>
                </Pressable>
              </View>
            )}
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period : {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
  filterRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    backgroundColor: GlobalStyles.colors.primary100,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
    fontSize: 14,
  },
  monthText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  }
});
