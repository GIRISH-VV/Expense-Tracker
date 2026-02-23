import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform,Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../ManageExpense/input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../../util/date';
import { GlobalStyles } from '../../../constants/styles';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? new Date(defaultValues.date) : new Date(),
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function showDatePickerHandler() {
    setShowDatePicker((currentState) => !currentState);
  }

  function dateChangeHandler(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }

    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        date: { value: selectedDate, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      expenseData.date instanceof Date && !isNaN(expenseData.date.getTime());
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      
       Alert.alert('Invalid input', 'Please check your input values');
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid },
        };
      });
      return;
    }


    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount (₹)"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <View style={[styles.rowInput, styles.dateContainer]}>
          <Text style={[styles.label, !inputs.date.isValid && styles.invalidLabel]}>
            Date
          </Text>
          <Pressable
            onPress={showDatePickerHandler}
            style={[
              styles.dateButton,
              !inputs.date.isValid && styles.invalidDateButton,
            ]}
          >
            <Text style={styles.dateText}>{getFormattedDate(inputs.date.value)}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={inputs.date.value}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={dateChangeHandler}
            />
          )}
        </View>
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,

            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.invalidText}>Please check your input values</Text>}
       <View style={styles.buttons}>
              <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
              <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  dateContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  dateButton: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 10,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  invalidText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidDateButton: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
