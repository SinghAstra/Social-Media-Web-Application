import { AUTH, LOG_OUT } from "./actionTypes";
import { signInApi, signUpApi } from "../api";
import { showNotification } from "./notifications";

// Helper function to handle authentication-related actions
const handleAuthAction = (dispatch, data, successMessage) => {
  // Extract user data and token from API response
  const userData = { ...data.result, token: data.token };

  // Dispatch AUTH action to update state with user data
  dispatch({ type: AUTH, payload: userData });

  // Show a success notification
  dispatch(showNotification(successMessage, "success"));
};

// Action creator for user sign-in
export const signIn = (formData, navigate) => {
  return async function (dispatch) {
    try {
      // Call the sign-in API
      const { data } = await signInApi(formData);

      handleAuthAction(
        dispatch,
        data,
        `Welcome back, ${data.result.name.split(" ")[0]}!`
      );

      // Navigate to the desired page after successful sign-in
      navigate("/");
    } catch (error) {
      // Handle errors by showing an error notification
      dispatch(showNotification(error.response.data.message, "error"));
    }
  };
};

// Action creator for user sign-up
export const signUp = (formData, navigate) => {
  return async function (dispatch) {
    try {
      // Call the sign-up API
      const { data } = await signUpApi(formData);

      // Handle authentication action with success message
      handleAuthAction(
        dispatch,
        data,
        `Welcome, ${
          data.result.name.split(" ")[0]
        }! You have successfully signed up.`
      );

      // Navigate to the desired page after successful sign-up
      navigate("/");
    } catch (error) {
      // Handle errors by showing an error notification
      dispatch(showNotification(error.response.data.message, "error"));
    }
  };
};

// Action creator for user log-out
export const logOut = (setUser) => {
  return async function (dispatch) {
    try {
      // Clear local storage, dispatch LOG_OUT action, and reset user state
      localStorage.clear();
      dispatch({ type: LOG_OUT });
      setUser(null);
    } catch (error) {
      // Log any errors that occur during log-out
      console.log("error in logOutUser is ", error);
    }
  };
};
