import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function saveHandler() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Invalid Input', 'Please enter both name and email.');
      return;
    }

    Alert.alert('Success', 'Profile updated successfully.');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={GlobalStyles.colors.gray500}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={GlobalStyles.colors.gray500}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]} onPress={saveHandler}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  card: {
    marginTop: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 12,
    padding: 16,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    paddingVertical: 12,
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});
