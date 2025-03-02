import { useContext, useState } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import GoogleSignIn from "../components/GoogleSignIn";

const auth = getAuth(app);

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      navigation.navigate("Success");
      setTimeout(() => {
        authCtx.authenticate(token);
      }, 2000);
    } catch (error) {
      let message = "Could not create user, please try again later.";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters long.";
      }
      Alert.alert("Authentication failed", message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  const handleGoogleSignInSuccess = (user) => {
    console.log("Google Sign-In successful with user:", user.uid);
    navigation.navigate("Success");
    setTimeout(() => {
      authCtx.authenticate(user.uid);
    }, 2000);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <AuthContent onAuthenticate={signupHandler} />

        <View style={styles.dividerContainer}>
          <Text style={styles.text}>Or</Text>
        </View>

        <View style={styles.googleButtonContainer}>
          <GoogleSignIn onAuthSuccess={handleGoogleSignInSuccess} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  dividerContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  googleButtonContainer: {
    width: "100%",
    marginBottom: 20,
  },
});

export default SignupScreen;
