import { AUTH, LOG_OUT } from "./actionTypes";
import { signInApi, signUpApi } from "../api";

export const signInUser = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const { data } = await signInApi(formData);
      data.result = { ...data.result, token: data.token };
      dispatch({ type: AUTH, payload: data.result });
      navigate("/");
    } catch (error) {
      console.log("error in signInUser is ", error);
    }
  };
};

export const signUpUser = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const { data } = await signUpApi(formData);
      data.result = { ...data.result, token: data.token };
      dispatch({ type: AUTH, payload: data.result });
      navigate("/");
    } catch (error) {
      console.log("error in signUpUser is ", error);
    }
  };
};

export const logOutUser = (setUser) => {
  return async function (dispatch) {
    try {
      localStorage.clear();
      dispatch({ type: LOG_OUT });
      setUser(null);
    } catch (error) {
      console.log("error in logOutUser is ", error);
    }
  };
};
