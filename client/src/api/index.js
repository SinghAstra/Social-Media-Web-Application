import axios from "axios";
const API_URL = "http://localhost:5000/";
// const API_URL = "https://tourtrackr.onrender.com/";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    console.log("token is ", token);
  }
  // req.headers.Authorization = `Beaerer `
  return req;
});

export const createPostApi = ({
  title,
  message,
  creator,
  tags,
  selectedFile,
}) => API.post(`/post`, { title, message, creator, tags, selectedFile });

export const getAllPostApi = () => API.get(`/post`);

export const updatePostApi = (id, updatedFormData) =>
  API.put(`/post/${id}`, updatedFormData);

export const deletePostApi = (id) => API.delete(`/post/${id}`);

export const likePostApi = (id) => API.put(`/post/${id}/likePost`);

export const signInApi = (formData) =>
  API.post(`/user/signIn`, {
    email: formData.email,
    password: formData.password,
  });

export const signUpApi = (formData) => API.post(`/user/signUp`, formData);
