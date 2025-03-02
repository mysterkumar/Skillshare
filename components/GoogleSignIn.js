import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import googleConfig, { getRedirectUri } from "../config/googleAuth";

// Required for authentication session callbacks
WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = ({ onAuthSuccess }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleConfig.expoClientId,
    iosClientId: googleConfig.iosClientId,
    androidClientId: googleConfig.androidClientId,
    webClientId: googleConfig.webClientId,
    scopes: googleConfig.scopes,
    redirectUri: getRedirectUri(),
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Call your backend to verify the token or use it directly
      console.log("Authentication successful:", authentication);

      // Fetch user info using the access token
      fetchUserInfo(authentication.accessToken).then((userInfo) => {
        onAuthSuccess(userInfo);
      });
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google user info:", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync({ useProxy: true })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default GoogleSignIn;
