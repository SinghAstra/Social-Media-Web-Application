import { START_LOADING, END_LOADING } from "../actions/actionTypes";

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case END_LOADING:
      return false;
    default:
      return state;
  }
};
