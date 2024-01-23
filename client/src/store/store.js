import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";

export const store = createStore(
  rootReducer,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);
