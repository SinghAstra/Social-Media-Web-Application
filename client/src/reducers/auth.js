import { AUTH, LOG_OUT } from "../actions/actionTypes";
const initialState = {
  authState: JSON.parse(localStorage.getItem("user")),
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, authState: action.payload };
    case LOG_OUT:
      return { ...state, authState: null };
    default:
      return state;
  }
};
