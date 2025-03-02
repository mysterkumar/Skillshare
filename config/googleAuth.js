import * as AuthSession from "expo-auth-session";

const googleConfig = {
  expoClientId:
    "561840984280-na7o4t8edsolg7jvqv34dtcuvll04k83.apps.googleusercontent.com",
  iosClientId: "", // Leave empty if you don't have iOS client ID
  androidClientId:
    "561840984280-e8mon5lk0q767ncoh9pbgub9h3nbffi6.apps.googleusercontent.com",
  webClientId:
    "561840984280-na7o4t8edsolg7jvqv34dtcuvll04k83.apps.googleusercontent.com",
  scopes: ["profile", "email"],
};

export const getRedirectUri = () => {
  return AuthSession.makeRedirectUri({
    useProxy: true,
  });
};

export default googleConfig;
