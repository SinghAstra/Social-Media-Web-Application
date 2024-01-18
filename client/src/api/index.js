import axios from "axios";
const API_URL = "http://localhost:5000/";
// const API_URL = "https://tourtrackr.onrender.com/";

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

export const getAllPostApi = (page) => API.get(`/post`, { params: { page } });

export const getPostBySearchApi = (searchQuery) => {
  return API.get("/post", { params: searchQuery });
};

export const updatePostApi = (id, updatedFormData) => {
  const formDataObject = {
    title: updatedFormData.get("title"),
    message: updatedFormData.get("message"),
    tags: updatedFormData.getAll("tags"),
    selectedFile: updatedFormData.get("selectedFile"),
  };
  return API.put(`/post/${id}`, formDataObject);
};

export const deletePostApi = (id) => API.delete(`/post/${id}`);

export const likePostApi = (id) => API.put(`/post/${id}/likePost`);

export const signInApi = (formData) =>
  API.post(`/user/signIn`, {
    email: formData.email,
    password: formData.password,
  });

export const signUpApi = (formData) => API.post(`/user/signUp`, formData);
