import {
  createPostApi,
  deletePostApi,
  getAllPostApi,
  getPostBySearchApi,
  likePostApi,
  updatePostApi,
} from "../api";
import { showNotification } from "./notifications";
const {
  CREATE_POST,
  FETCH_ALL_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  START_LOADING_POSTS,
  END_LOADING_POSTS,
} = require("./actionTypes");

export const createPost = (formDataObject) => {
  return async function (dispatch) {
    try {
      dispatch(showNotification("Creating Post", "info"));
      const { data } = await createPostApi(formDataObject);
      dispatch({ type: CREATE_POST, payload: data.post });
      dispatch(showNotification(data.message, "success"));
    } catch (error) {
      console.log("error.response.data is ", error.response.data);
      console.log(
        "error.response.data.message is ",
        error.response.data.message
      );
      // dispatch(showNotification(error.response.data.message, "error"));
    }
  };
};

export const fetchAllPost = (page) => {
  return async function (dispatch) {
    try {
      dispatch({ type: START_LOADING_POSTS });
      const { data } = await getAllPostApi(page);
      dispatch({
        type: FETCH_ALL_POST,
        payload: {
          posts: data.data,
          page: data.page,
          numberOfPages: data.totalPages,
        },
      });
      dispatch({ type: END_LOADING_POSTS });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPostBySearch = (searchQuery) => {
  return async function (dispatch) {
    try {
      dispatch({ type: START_LOADING_POSTS });
      const { data } = await getPostBySearchApi(searchQuery);
      dispatch({
        type: FETCH_ALL_POST,
        payload: {
          posts: data.data,
          page: data.page,
          numberOfPages: data.totalPages,
        },
      });
      dispatch({ type: END_LOADING_POSTS });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (updatedFormData, currentId) => {
  return async function (dispatch) {
    try {
      dispatch(showNotification("Updating Post", "info"));
      const { data } = await updatePostApi(currentId, updatedFormData);
      dispatch({ type: UPDATE_POST, payload: data.data });
      dispatch(showNotification(data.message, "success"));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async function (dispatch) {
    try {
      dispatch(showNotification("Deleting Post", "info"));
      const { data } = await deletePostApi(id);
      dispatch({ type: DELETE_POST, payload: id });
      dispatch(showNotification(data.message, "success"));
    } catch (error) {
      console.log(error);
    }
  };
};
export const likePost = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await likePostApi(id);
      dispatch({ type: LIKE_POST, payload: data.data });
      dispatch(showNotification(data.message, "info"));
    } catch (error) {
      console.log(error);
    }
  };
};
