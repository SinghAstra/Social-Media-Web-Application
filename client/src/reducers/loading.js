import { END_LOADING_POSTS, START_LOADING_POSTS } from "../actions/actionTypes";

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING_POSTS:
      return true;
    case END_LOADING_POSTS:
      return false;
    default:
      return state;
  }
};
