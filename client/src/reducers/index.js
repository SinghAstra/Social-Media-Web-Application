import { combineReducers } from "redux";
import { postReducer } from "./post";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";

export const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
  loading: loadingReducer,
});
