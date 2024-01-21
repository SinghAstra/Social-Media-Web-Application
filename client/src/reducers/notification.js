import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actions/actionTypes";

const initialState = {
  open: false,
  message: "",
  severity: "error",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        open: false,
        message: "",
        severity: "error",
      };
    default:
      return state;
  }
};

export default notificationReducer;
