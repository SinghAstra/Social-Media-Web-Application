import { combineReducers } from "redux";
import { postReducer } from "./post";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";
import notificationReducer from "./notification";

export const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
  loadingPosts: loadingReducer,
  notification: notificationReducer,
});
