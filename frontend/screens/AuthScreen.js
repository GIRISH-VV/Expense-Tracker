import { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function AuthScreen({ navigation }){
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = () => {

        if(!isLogin && name.trim() === ""){
            Alert.alert("Error","Enter name");
            return;
        }
        
        if(email.trim() === "" || password.trim() === ""){
            Alert.alert("Error","Enter email and password");
            return;
        }

        if(isLogin){
            Alert.alert("Success", "Login Successful");
            navigation.replace("ExpensesOverview");
        }
        else {
            Alert.alert("Success", "Registered Successfully")
            navigation.replace("ExpensesOverview");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.authCard}>
                <Text style={styles.title}>
                    {isLogin ? "Login" : "Register"}
                </Text>
                {
                    !isLogin && (
                        <TextInput 
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor={GlobalStyles.colors.gray500}
                            value={name}
                            onChangeText={setName}                    
                        />
                    )
                }
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={GlobalStyles.colors.gray500}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={GlobalStyles.colors.gray500}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.buttonText}>
                        {isLogin ? "Login" : "Register"}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin
                        ? "Don't have account? Register"
                        : "Already have account? Login"
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  authCard: {
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: GlobalStyles.colors.accent500,
    fontWeight: "600",
  },
});
