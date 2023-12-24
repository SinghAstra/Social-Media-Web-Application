import { combineReducers } from "redux";
import { postReducer } from "./post";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});
