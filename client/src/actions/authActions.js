import { logInApi, signUpApi } from "../api";
import { AUTH } from "./actionTypes";

export const logInAction = (values) => {
  return async function (dispatch) {
    try {
      const { data } = await logInApi(values);
      console.log("login data is ", data);
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error is  : ", error);
    }
  };
};

export const signUpAction = (values) => {
  return async function (dispatch) {
    try {
      const { data } = await signUpApi(values);
      console.log("signup data is ", data);
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error is  : ", error);
    }
  };
};
