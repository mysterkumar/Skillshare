import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebaseConfig";

// Register the authentication callback
WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

export const useGoogleAuthentication = (onAuthSuccess, onAuthError) => {
  // Configure Google auth with all required client IDs
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "561840984280-e8mon5lk0q767ncoh9pbgub9h3nbffi6.apps.googleusercontent.com",
    webClientId:
      "561840984280-na7o4t8edsolg7jvqv34dtcuvll04k83.apps.googleusercontent.com",
    expoClientId:
      "561840984280-na7o4t8edsolg7jvqv34dtcuvll04k83.apps.googleusercontent.com",
    responseType: "token", // Use token instead of id_token for better compatibility
    scopes: ["profile", "email"],
  });

  // Process the authentication response
  React.useEffect(() => {
    if (response?.type === "success") {
      console.log("Google auth response success:", response);
      const { authentication } = response;

      if (authentication?.accessToken) {
        // Create Firebase credential with the Google access token
        const credential = GoogleAuthProvider.credential(
          null, // Pass null for idToken
          authentication.accessToken // Use accessToken instead
        );

        // Sign in to Firebase with the Google credential
        signInWithCredential(auth, credential)
          .then((result) => {
            console.log("Firebase Google sign-in successful");
            // Pass user info to callback
            onAuthSuccess(result.user);
          })
          .catch((error) => {
            console.error("Firebase Google sign-in error:", error);
            onAuthError(error.message);
          });
      } else {
        console.error("Missing access token in response");
        onAuthError("Authentication failed: Missing access token");
      }
    } else if (response?.type === "error") {
      console.error("Google auth response error:", response.error);
      onAuthError(
        `Authentication failed: ${response.error?.message || "Unknown error"}`
      );
    }
  }, [response, onAuthSuccess, onAuthError]);

  return {
    request,
    promptAsync: () => promptAsync({ useProxy: true, showInRecents: true }),
  };
};
