import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function SettingsScreen({ navigation }) {
  function editProfileHandler() {
    navigation.navigate('EditProfile');
  }

  function logoutHandler() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          const parentNavigation = navigation.getParent();
          if (parentNavigation?.replace) {
            parentNavigation.replace('Auth');
            return;
          }
          navigation.navigate('Auth');
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>

        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          onPress={editProfileHandler}
        >
          <Text style={styles.actionText}>Edit Profile</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.actionButton, styles.logoutButton, pressed && styles.pressed]}
          onPress={logoutHandler}
        >
          <Text style={styles.actionText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: GlobalStyles.colors.error500,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
