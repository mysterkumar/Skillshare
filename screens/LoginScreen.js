import { useContext, useState } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import GoogleSignIn from "../components/GoogleSignIn";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log("Email/Password Sign-In successful");
      authCtx.authenticate(token);
    } catch (error) {
      console.error("Email/Password Sign-In error:", error);
      Alert.alert(
        "Authentication failed!",
        error.message || "Could not log you in. Please check your credentials!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  const handleGoogleSignInSuccess = (user) => {
    console.log("Google Sign-In successful with user:", user.uid);
    // Get token from user
    user.getIdToken().then((token) => {
      authCtx.authenticate(token);
    });
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <AuthContent isLogin onAuthenticate={loginHandler} />

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

export default LoginScreen;

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
