import axios from "axios";
// const API_URL = "http://localhost:3001/";
const API_URL = "https://tourtrackr.onrender.com/";

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createPostApi = (formDataObject) => {
  return API.post(`/post`, formDataObject);
};

export const getPostById = (id) => API.get(`/post/${id}`);

export const getAllPostApi = (page) => API.get(`/post`, { params: { page } });

export const getPostBySearchApi = (searchQuery) => {
  return API.get("/post", { params: searchQuery });
};

export const updatePostApi = (id, updatedFormData) => {
  return API.put(`/post/${id}`, updatedFormData);
};

export const deletePostApi = (id) => API.delete(`/post/${id}`);

export const likePostApi = (id) => API.put(`/post/${id}/likePost`);

export const signInApi = (formData) =>
  API.post(`/user/signIn`, {
    email: formData.email,
    password: formData.password,
  });

export const signUpApi = (formData) => API.post(`/user/signUp`, formData);
