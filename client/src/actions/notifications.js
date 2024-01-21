import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actionTypes";

export const showNotification = (message, severity) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      message,
      severity,
    },
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};
