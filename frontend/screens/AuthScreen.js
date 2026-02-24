import { useContext, useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert, ActivityIndicator} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { loginUser, registerUser } from "../util/api";
import { AuthContext } from "../store/auth-context";

export default function AuthScreen({ navigation }){
    const [isLogin, setIsLogin] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authCtx = useContext(AuthContext);

    const handleAuth = async () => {

        if(!isLogin && name.trim() === ""){
            Alert.alert("Error","Enter name");
            return;
        }
        
        if(email.trim() === "" || password.trim() === ""){
            Alert.alert("Error","Enter email and password");
            return;
        }

        setIsSubmitting(true);

        try {
          if(isLogin){
            const response = await loginUser({ email, password });
            if (!response?.accessToken) {
              throw new Error("Access token not received");
            }
            authCtx.authenticate(response.accessToken);
            Alert.alert("Success", "Login Successful");
          }
          else {
            await registerUser({ name, email, password });
            Alert.alert("Success", "Registered Successfully. Please login.");
            setIsLogin(true);
            setPassword("");
          }
        }
        catch (error) {
          const message =
            error?.response?.data?.message || "Authentication failed. Please try again.";
          Alert.alert("Error", message);
        }
        finally {
          setIsSubmitting(false);
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
                <TouchableOpacity
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  onPress={handleAuth}
                  disabled={isSubmitting}
                >
                    {isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.buttonText}>
                          {isLogin ? "Login" : "Register"}
                      </Text>
                    )}
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
  buttonDisabled: {
    opacity: 0.7,
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
