import axios from "axios";

const API_KEY = "AIzaSyAf6eMV9YBF552FYmRd1m10sZeNCNkhs3E";

async function authenticate(mode, email, password) {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;
    return token;
  } catch (error) {
    let message = "Authentication failed";
    if (error.response) {
      const errorCode = error.response.data?.error?.message;

      switch (errorCode) {
        case "EMAIL_EXISTS":
          message = "This email is already registered";
          break;
        case "INVALID_PASSWORD":
          message = "Invalid password";
          break;
        case "EMAIL_NOT_FOUND":
          message = "Email not found";
          break;
        case "WEAK_PASSWORD":
          message = "Password should be at least 6 characters long";
          break;
      }
    }
    throw new Error(message);
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
