import {
  CREATE_POST,
  DELETE_POST,
  FETCH_ALL_POST,
  LIKE_POST,
  UPDATE_POST,
} from "../actions/actionTypes";

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POST:
      return {
        ...state,
        posts: action.payload.posts,
        page: action.payload.page,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case LIKE_POST:
    case UPDATE_POST:
      console.log("state.posts is ", state.posts);
      console.log("action.payload._id is ", action.payload._id);
      return {
        ...state,
        posts: state.posts.map((post) => {
          console.log("post._id is", post._id);
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
